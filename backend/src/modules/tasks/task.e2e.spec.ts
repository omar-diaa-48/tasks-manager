import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from "supertest";
import { Repository } from 'typeorm';
import { AppModule } from '../../app.module';
import { generateID } from '../../utilities/helpers';
import { History } from '../history/history.entity';
import { Status } from '../status/status.entity';
import { User } from '../users/user.entity';
import { Task } from './task.entity';

describe('TaskController', () => {
	let app: INestApplication;
	let user: User;
	let status: Status;
	let task: Task;
	let accessToken: string;

	beforeAll(async () => {

		const moduleRef = await Test
			.createTestingModule({
				imports: [AppModule],
				controllers: [],
				providers: []
			})
			.compile();

		app = moduleRef.createNestApplication();
		await app.init();

		user = await app.get<Repository<User>>(getRepositoryToken(User)).create({ username: "john", password: "asdf1234" }).save();
		status = await app.get<Repository<Status>>(getRepositoryToken(Status)).create({ title: "To Do" }).save();
		task = await app.get<Repository<Task>>(getRepositoryToken(Task)).create({ id: generateID("T"), title: "Dummy", description: "Dummy", statusId: status.id, userId: user.id }).save();

		const payload = {
			id: user.id,
			username: user.username
		}

		accessToken = app.get<JwtService>(JwtService).sign(payload);
	});

	it('GET /tasks should return all tasks', () => {
		return request(app.getHttpServer())
			.get("/tasks")
			.set('Authorization', `Bearer ${accessToken}`)
			.expect(200)
			.then(response => {
				expect(response.body).toBeDefined()
			})
	})

	it('GET /tasks/:taskId should return not found task id', () => {
		return request(app.getHttpServer())
			.get("/tasks/12345")
			.set('Authorization', `Bearer ${accessToken}`)
			.expect(404)
	})

	it('GET /tasks/:taskId should return specific task', async () => {
		return request(app.getHttpServer())
			.get(`/tasks/${task.id}`)
			.set('Authorization', `Bearer ${accessToken}`)
			.expect(200)
			.then(response => expect(response.body.task.id).toEqual(task.id))
	})

	it('POST /tasks should return unauthorized without token', async () => {
		return request(app.getHttpServer())
			.post('/tasks')
			.send({})
			.expect(401)
	})

	// it('POST /tasks should add a task and return it', async () => {
	// 	return request(app.getHttpServer())
	// 		.post('/tasks')
	// 		.set('Authorization', `Bearer ${accessToken}`)
	// 		.send({
	// 			title: "Rubbish",
	// 			description: "Rubbish",
	// 			statusId: status.id,
	// 			userId: user.id
	// 		})
	// 		.expect(201)
	// 		.then(response => {
	// 			expect(response.body.id).toBeDefined()
	// 		})
	// })

	afterAll(async () => {
		await History.delete({})
		await Task.delete({})
		await User.delete({})

		await app.close();
	});
});