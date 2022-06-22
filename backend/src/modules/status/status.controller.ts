
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Status } from "./status.entity";
import { StatusService } from "./status.service";


@ApiTags('todos')
@Controller('todos')
export class StatusController {
	constructor(
		private service: StatusService
	) { }

	@Get()
	getAllStatuses(): Promise<Status[]> {
		return this.service.getAll();
	}
}