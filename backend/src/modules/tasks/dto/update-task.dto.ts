import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
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
	@Transform(({ value }) => parseInt(value))
	@IsNumber()
	userId?: number;
}