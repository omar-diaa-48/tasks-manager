
import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { JwtPayload } from "src/types/jwt-payload";
import { BaseRepository } from "../base/base-repository";
import { CredentialsDTO } from "./dto/credentials.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private repository: BaseRepository<User>,

		private jwtService: JwtService
	) { }

	async signup(signupDTO: CredentialsDTO): Promise<JwtPayload> {
		const { username, password } = signupDTO;
		let user: User;

		user = await this.repository.findOneBy({ username })

		if (user) {
			throw new BadRequestException("Username already used")
		}

		user = new User();

		// 1 for admin user while 2 for regular user
		user.username = username;
		user.password = this.hashPassword(password);

		await user.save();

		const payload: JwtPayload = {
			id: user.id,
			username: user.username
		}

		const accessToken = this.jwtService.sign(payload, { expiresIn: '21d' });

		payload.accessToken = accessToken;

		return payload;
	}

	signin(signinDTO: CredentialsDTO): Promise<JwtPayload> {
		console.log(signinDTO);
		return this.repository.addOne(signinDTO);
	}

	hashPassword(password: string): string {
		return bcrypt.hashSync(password, 10);
	}
}