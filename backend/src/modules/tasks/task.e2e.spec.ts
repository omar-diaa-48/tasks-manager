import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import * as request from "supertest";
import { Repository } from 'typeorm';
import { AppModule } from '../../app.module';
import { Status } from '../status/status.entity';
import { User } from '../users/user.entity';
import { TaskService } from './task.service';

describe('TaskController', () => {
	let app: INestApplication;
	let user: User;
	let status: Status;
	let payload = {};
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
					}),
				],
				controllers: [],
				providers: []
			})
			.compile();

		app = moduleRef.createNestApplication();
		await app.init();

		user = await app.get<Repository<User>>(getRepositoryToken(User)).create({ username: "omar", password: "asdf1234" }).save();
		status = await app.get<Repository<Status>>(getRepositoryToken(Status)).create({ title: "To Do" }).save();

		payload = {
			id: user.id,
			username: user.username
		}

		accessToken = app.get<JwtService>(JwtService).sign(payload);
	});

	it('GET /tasks', () => {
		return request(app.getHttpServer())
			.get("/tasks")
			.set('Authorization', `Bearer ${accessToken}`)
			.expect(200)
	})

	it('GET /tasks/:taskId', () => {
		return request(app.getHttpServer())
			.get("/tasks/12345")
			.set('Authorization', `Bearer ${accessToken}`)
			.expect(404)
	})

	it('GET /tasks/:taskId', async () => {
		const task = await app.get<TaskService>(TaskService).addOne(
			{ title: "Dummy", description: "Dummy", statusId: status.id, userId: user.id },
			{ id: user.id, username: user.username, accessToken: "" }
		)

		return request(app.getHttpServer())
			.get(`/tasks/${task.id}`)
			.set('Authorization', `Bearer ${accessToken}`)
			.expect(200)
	})

	it('POST /tasks', async () => {
		return request(app.getHttpServer())
			.post('/tasks')
			.send({})
			.expect(401)
	})

	it('POST /tasks', async () => {
		return request(app.getHttpServer())
			.post('/tasks')
			.set('Authorization', `Bearer ${accessToken}`)
			.send({
				title: "Dummy",
				description: "Dummy",
				statusId: status.id,
				userId: user.id
			})
			.expect(201)
	})

	afterAll(async () => {
		await app.close();
	});
});