
import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CredentialsDTO } from "./dto/credentials.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";


@ApiTags('users')
@Controller('users')
export class UserController {
	constructor(
		private service: UserService
	) { }

	@Post("signup")
	@UsePipes(ValidationPipe)
	signup(
		@Body() signupDTO: CredentialsDTO
	): Promise<User> {
		return this.service.signup(signupDTO);
	}

	@Post("signin")
	@UsePipes(ValidationPipe)
	signin(
		@Body() signinDTO: CredentialsDTO
	): Promise<User> {
		return this.service.signin(signinDTO);
	}
}