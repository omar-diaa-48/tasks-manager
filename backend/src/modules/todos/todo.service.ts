
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtPayload } from "src/utilities/types/jwt-payload";
import { BaseRepository } from "../base/base-repository";
import { AddTodoDTO } from "./dto/add-todo.dto";
import { UpdateTodoDTO } from "./dto/update-todo.dto";
import { Todo } from "./todo.entity";

@Injectable()
export class TodoService {
	constructor(
		@InjectRepository(Todo)
		private repository: BaseRepository<Todo>
	) { }

	getAll(statusId?: number): Promise<Todo[]> {
		const relations = ["user"]

		let where = {};

		if (statusId) {
			where = {
				statusId
			}
		}

		return this.repository.find({ where, relations });
	}

	getById(id: number): Promise<Todo> {
		return this.repository.findOneBy({ id });
	}

	async addOne(addTodoDTO: AddTodoDTO, user: JwtPayload): Promise<Todo> {
		const record = this.repository.create();

		for (const key in addTodoDTO) {
			const field = addTodoDTO[key];

			if (this.repository.metadata.hasColumnWithPropertyPath(key)) {
				record[key] = field;
			}
		}

		record.statusId = 1;
		record.userId = user.id;

		await record.save();

		return record;
	}

	async updateOne(id: number, updateTodoDTO: UpdateTodoDTO, user: JwtPayload): Promise<Todo> {
		const record = await this.repository.findOneBy({ id });

		if (!record) {
			throw new NotFoundException(`${this.repository.metadata.tableName} table has no record with id ${id}`)
		}

		// for every key in the relations to be loaded, check if it exists and update it
		for (const key in updateTodoDTO) {
			if (key !== "id" && this.repository.metadata.hasColumnWithPropertyPath(key)) {
				const field = updateTodoDTO[key];
				record[key] = field
			}
		}

		await record.save()

		return record;
	}

	deleteOne(id: number): Promise<{ id: number }> {
		return this.repository.deleteOne(id);
	}
}