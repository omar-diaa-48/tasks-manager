
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "../base/base-repository";
import { CredentialsDTO } from "./dto/credentials.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private repository: BaseRepository<User>
	) { }

	signup(signupDTO: CredentialsDTO): Promise<User> {
		return this.repository.addOne(signupDTO);
	}

	signin(signupDTO: CredentialsDTO): Promise<User> {
		return this.repository.addOne(signupDTO);
	}
}