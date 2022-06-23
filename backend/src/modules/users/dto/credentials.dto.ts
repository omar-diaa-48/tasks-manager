import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString } from "class-validator";

export class CredentialsDTO {
	@ApiProperty({
		default: "john50",
	})
	@IsDefined()
	@IsString()
	username: string;

	@ApiProperty({
		default: "1234xx4321",
	})
	@IsDefined()
	@IsString()
	password: string;
}