
import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetUser } from "src/utilities/decorators/get-user.decorator";
import { JwtPayload } from "src/utilities/types/jwt-payload";
import { CredentialsDTO } from "./dto/credentials.dto";
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
	): Promise<JwtPayload> {
		return this.service.signup(signupDTO);
	}

	@Post("signin")
	@UsePipes(ValidationPipe)
	signin(
		@Body() signinDTO: CredentialsDTO
	): Promise<JwtPayload> {
		return this.service.signin(signinDTO);
	}

	@Post('refresh-token')
	@HttpCode(200)
	jwtSignIn(@GetUser() user: JwtPayload): Promise<JwtPayload> {
		return this.service.jwtSignIn(user)
	}
}