import { ApiProperty } from "@nestjs/swagger";
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
	description: number;

	@ApiProperty()
	@IsDefined()
	@IsNumber()
	statusId: number;

	@ApiProperty()
	@IsDefined()
	@IsNumber()
	assigneeId: number;
}