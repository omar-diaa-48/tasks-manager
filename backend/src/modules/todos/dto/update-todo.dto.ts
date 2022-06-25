import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class UpdateTodoDTO {
	@ApiProperty()
	@IsOptional()
	@IsNumber()
	statusId?: number;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	assigneeId?: number;
}