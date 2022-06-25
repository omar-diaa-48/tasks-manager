import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateTaskDTO {
	@ApiProperty()
	@IsOptional()
	@IsString()
	@MaxLength(30)
	title: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	@MaxLength(255)
	description: number;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	userId?: number;
}