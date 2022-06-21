import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString } from "class-validator";

export class AddTodoDTO {
	@ApiProperty()
	@IsDefined()
	@IsString()
	name: string;

	@ApiProperty()
	@IsDefined()
	@IsString()
	description: number;
}