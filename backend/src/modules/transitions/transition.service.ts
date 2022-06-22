
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "../base/base-repository";
import { Transition } from "./transition.entity";

@Injectable()
export class TransitionService {
	constructor(
		@InjectRepository(Transition)
		private repository: BaseRepository<Transition>
	) { }

	getAll(): Promise<Transition[]> {
		return this.repository.getAll();
	}
}