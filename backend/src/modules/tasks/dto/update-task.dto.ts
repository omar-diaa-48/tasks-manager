import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class UpdateTaskDTO {
	@ApiProperty()
	@IsOptional()
	@IsNumber()
	statusId?: number;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	userId?: number;
}