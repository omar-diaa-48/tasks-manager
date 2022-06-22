
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Status } from "./status.entity";
import { StatusService } from "./status.service";


@ApiTags('statuses')
@Controller('statuses')
export class StatusController {
	constructor(
		private service: StatusService
	) { }

	@Get()
	getAllStatuses(): Promise<Status[]> {
		return this.service.getAll();
	}
}