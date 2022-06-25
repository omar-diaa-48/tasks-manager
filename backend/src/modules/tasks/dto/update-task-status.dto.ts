import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class UpdateTaskStatusDTO {
	@ApiProperty()
	@IsOptional()
	@IsNumber()
	statusId?: number;
}