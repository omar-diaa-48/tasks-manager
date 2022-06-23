
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { JwtPayload } from "src/utilities/types/jwt-payload";
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

	async signin(signinDTO: CredentialsDTO): Promise<JwtPayload> {
		const user = await this.validatePassword(signinDTO);

		if (!user) {
			throw new UnauthorizedException('Invalid credentials')
		}

		delete user.password;

		const payload: JwtPayload = {
			id: user.id,
			username: user.username
		}

		const accessToken = this.jwtService.sign(payload);

		payload.accessToken = accessToken;

		return payload;
	}

	async jwtSignIn(user: JwtPayload): Promise<JwtPayload> {
		if (!user) {
			throw new UnauthorizedException()
		}

		user = await this.repository.findOneBy({ id: user.id })

		if (!user) {
			throw new UnauthorizedException()
		}

		const payload: JwtPayload = {
			id: user.id,
			username: user.username
		}

		const accessToken = this.jwtService.sign(payload);

		payload.accessToken = accessToken;

		return payload;
	}

	async validatePassword(credentialsDto: CredentialsDTO): Promise<User> {
		const { username, password } = credentialsDto;

		const user = await this.repository.findOne({
			where: {
				username
			},
			select: ['id', 'username', 'password']
		});

		if (user && await this.comparePasswordBcrypt(password, user.password)) {
			return user;
		} else {
			return null;
		}
	}

	async comparePasswordBcrypt(usedPassword: string, userPassword: string): Promise<boolean> {
		return await bcrypt.compare(usedPassword, userPassword)
	}

	hashPassword(password: string): string {
		return bcrypt.hashSync(password, 10);
	}

}