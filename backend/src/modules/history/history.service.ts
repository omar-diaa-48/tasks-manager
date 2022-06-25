
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "../base/base-repository";
import { History } from "./history.entity";

@Injectable()
export class HistoryService {
	constructor(
		@InjectRepository(History)
		private repository: BaseRepository<History>
	) { }

	async addTodoHistory(userId: number, todoId: string, from: number, to: number): Promise<History> {
		const record = this.repository.create();

		record.userId = userId;
		record.todoId = todoId;
		record.prevStatusId = from;
		record.newStatusId = to;
		record.date = Date.now();

		await record.save();

		return record;
	}

	async getTodoHistory(todoId: string): Promise<History[]> {
		return this.repository.find({ where: { todoId }, order: { date: "ASC" }, relations: ["user", "prevStatus", "newStatus"] })
	}
}