
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { generateID, groupByKey } from "src/utilities/helpers";
import { JwtPayload } from "src/utilities/types/jwt-payload";
import { BaseRepository } from "../base/base-repository";
import { History } from "../history/history.entity";
import { HistoryService } from "../history/history.service";
import { AddTaskDTO } from "./dto/add-task.dto";
import { UpdateTaskStatusDTO } from "./dto/update-task-status.dto";
import { UpdateTaskDTO } from "./dto/update-task.dto";
import { Task } from "./task.entity";

@Injectable()
export class TaskService {
	constructor(
		@InjectRepository(Task)
		private repository: BaseRepository<Task>,

		private historyService: HistoryService
	) { }

	async getAll(statusId?: number): Promise<Task[]> {
		const relations = ["user"]

		let where = {};

		if (statusId) {
			where = {
				statusId
			}
		}

		const tasks = await this.repository.find({ where, relations });

		const tasksGroupedByStatusId = groupByKey(tasks, "statusId")

		return tasksGroupedByStatusId;
	}

	async getById(id: string): Promise<{ task: Task, history: History[] }> {
		const record = await this.repository.findOne({ where: { id }, relations: ["status", "user"] });

		if (!record) {
			throw new NotFoundException(`${this.repository.metadata.tableName} table has no record with id ${id}`)
		}

		const history = await this.historyService.getTaskHistory(record.id);

		return {
			task: record,
			history
		}
	}

	async addOne(addTaskDTO: AddTaskDTO, user: JwtPayload): Promise<Task> {
		let record = this.repository.create({ id: generateID("T") })

		for (const key in addTaskDTO) {
			const field = addTaskDTO[key];

			if (this.repository.metadata.hasColumnWithPropertyPath(key)) {
				record[key] = field;
			}
		}

		await record.save();

		await this.historyService.addTaskHistory(user.id, record.id, 100, record.statusId)

		record = await this.repository.findOne({ where: { id: record.id }, relations: ["status", "user"] })

		return record;
	}

	async updateStatus(id: string, updateTaskDTO: UpdateTaskStatusDTO, user: JwtPayload): Promise<Task> {
		let record = await this.repository.findOneBy({ id });

		if (record.userId !== user.id) {
			throw new UnauthorizedException('Only owner of the task can update it')
		}

		if (!record) {
			throw new NotFoundException(`${this.repository.metadata.tableName} table has no record with id ${id}`)
		}

		const prevStatusId = record.statusId;
		const newStatusId = updateTaskDTO.statusId;

		// for every key in the relations to be loaded, check if it exists and update it
		for (const key in updateTaskDTO) {
			if (key !== "id" && this.repository.metadata.hasColumnWithPropertyPath(key)) {
				const field = updateTaskDTO[key];
				record[key] = field
			}
		}

		await record.save()

		await this.historyService.addTaskHistory(user.id, record.id, prevStatusId, newStatusId)

		record = await this.repository.findOne({ where: { id }, relations: ["status", "user"] })

		return record;
	}

	async updateOne(id: string, updateTaskDTO: UpdateTaskDTO, user: JwtPayload): Promise<Task> {
		let record = await this.repository.findOneBy({ id });

		if ((record.userId != user.id) && (updateTaskDTO.userId != user.id)) {
			throw new UnauthorizedException('Only owner of the task can update it')
		}

		if (!record) {
			throw new NotFoundException(`${this.repository.metadata.tableName} table has no record with id ${id}`)
		}

		// for every key in the relations to be loaded, check if it exists and update it
		for (const key in updateTaskDTO) {
			if (key !== "id" && this.repository.metadata.hasColumnWithPropertyPath(key)) {
				const field = updateTaskDTO[key];
				record[key] = field
			}
		}

		await record.save()

		record = await this.repository.findOne({ where: { id }, relations: ["status", "user"] })

		return record;
	}

	async deleteOne(id: number): Promise<{ id: number }> {
		return this.repository.deleteOne(id);
	}
}