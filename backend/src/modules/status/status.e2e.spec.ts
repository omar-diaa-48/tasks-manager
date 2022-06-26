import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from "supertest";
import { AppModule } from '../../app.module';

describe('StatusController', () => {
	let app: INestApplication;

	beforeAll(async () => {

		const moduleRef = await Test
			.createTestingModule({
				imports: [AppModule]
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