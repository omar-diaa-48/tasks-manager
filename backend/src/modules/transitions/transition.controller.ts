
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Transition } from "./transition.entity";
import { TransitionService } from "./transition.service";


@ApiTags('transitions')
@Controller('transitions')
export class TransitionController {
	constructor(
		private service: TransitionService
	) { }

	@Get()
	getAllTransitiones(): Promise<Transition[]> {
		return this.service.getAll();
	}
}