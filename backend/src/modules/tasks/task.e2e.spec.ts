import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TaskModule } from './task.module';
import { TaskService } from './task.service';

// const GetUserMock = {
// 	canActivate(ctx) {
// 		const request = ctx.switchToHttp().getRequest();

// 		if (!request["user"]) {
// 			throw new UnauthorizedException();
// 		}

// 		return request["user"]
// 	}
// }

describe('Task', () => {
	let app: INestApplication;
	let tasksService: TaskService;

	beforeAll(async () => {
		const moduleRef = await Test
			.createTestingModule({ imports: [TaskModule] })
			.compile();

		app = moduleRef.createNestApplication();
		await app.init();
	});

	it(`/GET tasks`, () => {
		return request(app.getHttpServer())
			.get('/tasks')
			.expect(401)
	});

	afterAll(async () => {
		await app.close();
	});
});