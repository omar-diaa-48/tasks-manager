import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class UpdateTaskStatusDTO {
	@ApiProperty()
	@IsOptional()
	@Transform(({ value }) => parseInt(value))
	@IsNumber()
	statusId?: number;
}