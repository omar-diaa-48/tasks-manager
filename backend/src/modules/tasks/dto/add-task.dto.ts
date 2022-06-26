import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDefined, IsNumber, IsString, MaxLength } from "class-validator";

export class AddTaskDTO {
	@ApiProperty()
	@IsDefined()
	@IsString()
	@MaxLength(30)
	title: string;

	@ApiProperty()
	@IsDefined()
	@IsString()
	@MaxLength(255)
	description: string;

	@ApiProperty()
	@IsDefined()
	@Transform(({ value }) => parseInt(value))
	@IsNumber()
	statusId: number;

	@ApiProperty()
	@IsDefined()
	@Transform(({ value }) => parseInt(value))
	@IsNumber()
	userId: number;
}