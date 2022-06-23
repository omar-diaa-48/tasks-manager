
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Status } from "./status.entity";

@Injectable()
export class StatusService {
	constructor(
		@InjectRepository(Status)
		private repository: Repository<Status>
	) { }

	getAll(): Promise<Status[]> {
		// only populate the allowed from transitions
		const relations = ["fromTransitions", "fromTransitions.to"];
		return this.repository.find({ relations });
	}
}