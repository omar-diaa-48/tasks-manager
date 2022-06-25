
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

	async addTaskHistory(userId: number, taskId: string, from: number, to: number): Promise<History> {
		const record = this.repository.create();

		record.userId = userId;
		record.taskId = taskId;
		record.prevStatusId = from;
		record.newStatusId = to;
		record.date = Date.now();

		await record.save();

		return record;
	}

	async getTaskHistory(taskId: string): Promise<History[]> {
		return this.repository.find({ where: { taskId }, order: { date: "ASC" }, relations: ["user", "prevStatus", "newStatus"] })
	}
}