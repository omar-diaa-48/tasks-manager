import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt";
import * as request from "supertest";
import { Repository } from 'typeorm';
import { AppModule } from '../../app.module';
import { User } from './user.entity';


describe('UserController', () => {
	let app: INestApplication;
	let user: User;
	let accessToken: string;

	beforeAll(async () => {

		const moduleRef = await Test
			.createTestingModule({
				imports: [
					AppModule,
					TypeOrmModule.forRoot({
						type: 'sqlite',
						database: ':memory:',
						entities: [process.cwd() + '/**/*.entity{.ts,.js}'],
						synchronize: true,
					})
				]
			})
			.compile();

		app = moduleRef.createNestApplication();
		await app.init();

		user = await app.get<Repository<User>>(getRepositoryToken(User)).create({ username: "omar", password: bcrypt.hashSync("asdf1234", 10) }).save();

		const payload = {
			id: user.id,
			username: user.username
		}

		accessToken = app.get<JwtService>(JwtService).sign(payload);
	});

	it('GET /users should return unauthorized without token', () => {
		return request(app.getHttpServer())
			.get("/users")
			.expect(401)
	})

	it('GET /users should return array of users', () => {
		return request(app.getHttpServer())
			.get("/users")
			.set('Authorization', `Bearer ${accessToken}`)
			.expect(200)
			.then(response => {
				expect(response.body).toBeDefined()
			})
	})

	it('POST /users/signin should return jwt payload with correct credentials', () => {
		return request(app.getHttpServer())
			.post("/users/signin")
			.send({
				username: "omar",
				password: "asdf1234"
			})
			.expect(200)
			.then(response => {
				expect(response.body).toBeDefined()
				expect(response.body.id).toEqual(user.id)
			})
	})

	afterAll(async () => {
		await app.close();
	});
});