import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNumber } from "class-validator";

export class UpdateTodoDTO {
	@ApiProperty()
	@IsDefined()
	@IsNumber()
	statusId: number;

	@ApiProperty()
	@IsDefined()
	@IsNumber()
	assigneeId: number;
}