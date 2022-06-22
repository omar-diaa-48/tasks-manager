import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNumber, IsString } from "class-validator";

export class UpdateTodoDTO {
	@ApiProperty()
	@IsDefined()
	@IsString()
	name: string;

	@ApiProperty()
	@IsDefined()
	@IsString()
	description: number;

	@ApiProperty()
	@IsDefined()
	@IsNumber()
	statusId: number;
}