import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from "supertest";
import { TaskModule } from './task.module';

describe('TaskController', () => {
	let app: INestApplication;

	beforeAll(async () => {

		const moduleRef = await Test
			.createTestingModule({
				imports: [
					TaskModule,
					TypeOrmModule.forRoot({
						type: 'sqlite',
						database: ':memory:',
						entities: [process.cwd() + '/**/*.entity{.ts,.js}'],
						synchronize: true,
					}),
				],
				controllers: [],
				providers: []
			})
			.compile();

		app = moduleRef.createNestApplication();
		await app.init();

	});

	it('GET /tasks', () => {
		return request(app.getHttpServer())
			.get("/tasks")
			.expect(200)
	})

	afterAll(async () => {
		await app.close();
	});
});