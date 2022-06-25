
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { generateID, groupByKey } from "src/utilities/helpers";
import { JwtPayload } from "src/utilities/types/jwt-payload";
import { BaseRepository } from "../base/base-repository";
import { History } from "../history/history.entity";
import { HistoryService } from "../history/history.service";
import { AddTodoDTO } from "./dto/add-todo.dto";
import { UpdateTodoDTO } from "./dto/update-todo.dto";
import { Todo } from "./todo.entity";

@Injectable()
export class TodoService {
	constructor(
		@InjectRepository(Todo)
		private repository: BaseRepository<Todo>,

		private historyService: HistoryService
	) { }

	async getAll(statusId?: number): Promise<Todo[]> {
		const relations = ["user"]

		let where = {};

		if (statusId) {
			where = {
				statusId
			}
		}

		const todos = await this.repository.find({ where, relations });

		const todosGroupedByStatusId = groupByKey(todos, "statusId")

		return todosGroupedByStatusId;
	}

	async getById(id: string): Promise<{ todo: Todo, history: History[] }> {
		const record = await this.repository.findOne({ where: { id }, relations: ["status", "user"] });

		if (!record) {
			throw new NotFoundException(`${this.repository.metadata.tableName} table has no record with id ${id}`)
		}

		const history = await this.historyService.getTodoHistory(record.id);

		return {
			todo: record,
			history
		}
	}

	async addOne(addTodoDTO: AddTodoDTO, user: JwtPayload): Promise<Todo> {
		const record = this.repository.create({ id: generateID("T") })

		for (const key in addTodoDTO) {
			const field = addTodoDTO[key];

			if (this.repository.metadata.hasColumnWithPropertyPath(key)) {
				record[key] = field;
			}
		}

		record.userId = user.id;

		await record.save();

		return record;
	}

	async updateStatus(id: string, updateTodoDTO: UpdateTodoDTO, user: JwtPayload): Promise<Todo> {
		let record = await this.repository.findOneBy({ id });

		if (record.userId !== user.id) {
			throw new UnauthorizedException('Only owner of the task can change its status')
		}

		if (!record) {
			throw new NotFoundException(`${this.repository.metadata.tableName} table has no record with id ${id}`)
		}

		const prevStatusId = record.statusId;
		const newStatusId = updateTodoDTO.statusId;

		// for every key in the relations to be loaded, check if it exists and update it
		for (const key in updateTodoDTO) {
			if (key !== "id" && this.repository.metadata.hasColumnWithPropertyPath(key)) {
				const field = updateTodoDTO[key];
				record[key] = field
			}
		}

		await record.save()

		await this.historyService.addTodoHistory(user.id, record.id, prevStatusId, newStatusId)

		record = await this.repository.findOne({ where: { id }, relations: ["status", "user"] })

		return record;
	}

	async deleteOne(id: number): Promise<{ id: number }> {
		return this.repository.deleteOne(id);
	}
}