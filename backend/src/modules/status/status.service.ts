
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "../base/base-repository";
import { Status } from "./status.entity";

@Injectable()
export class StatusService {
	constructor(
		@InjectRepository(Status)
		private repository: BaseRepository<Status>
	) { }

	getAll(): Promise<Status[]> {
		const relations = ["fromTransitions", "toTransitions"];
		return this.repository.getAll(relations);
	}
}