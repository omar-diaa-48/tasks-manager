import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString, MaxLength } from "class-validator";

export class AddTodoDTO {
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
}