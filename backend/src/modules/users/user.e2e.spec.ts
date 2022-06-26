import { INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from "supertest";
import { UserModule } from '../users/user.module';

describe('UserController', () => {
	let app: INestApplication;

	beforeAll(async () => {

		const moduleRef = await Test
			.createTestingModule({
				imports: [
					UserModule,
					TypeOrmModule.forRoot({
						type: 'sqlite',
						database: ':memory:',
						entities: [process.cwd() + '/**/*.entity{.ts,.js}'],
						synchronize: true,
					})
				]
			})
			.overrideProvider(JwtModule)
			.useValue(JwtModule.register({
				secret: "abc123321cba",
				signOptions: {
					expiresIn: 3600 * 60
				}
			}))
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