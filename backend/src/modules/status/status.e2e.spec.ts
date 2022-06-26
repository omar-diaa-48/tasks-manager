import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from "supertest";
import { AppModule } from '../../app.module';

describe('StatusController', () => {
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
					}),
				]
			})
			.compile();

		app = moduleRef.createNestApplication();
		await app.init();

	});

	it('GET /statuses', () => {
		return request(app.getHttpServer())
			.get("/statuses")
			.expect(200)
	})

	afterAll(async () => {
		await app.close();
	});
});