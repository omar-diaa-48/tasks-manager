import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import * as request from "supertest";

const userService = {
	getAll: () => { },
	signup: () => { },
	signin: () => { },
	jwtSignIn: () => { }
}

describe('UserController', () => {
	let app: INestApplication;

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

	});

	it('GET /users', () => {
		return request(app.getHttpServer())
			.get("/users")
			.expect(200)
	})

	afterAll(async () => {
		await app.close();
	});
});