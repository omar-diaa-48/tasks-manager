import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { StatusModule } from './modules/status/status.module';

describe('App', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleRef = await Test
			.createTestingModule({
				imports: [
					StatusModule,
					TypeOrmModule.forRoot({
						type: 'sqlite',
						database: ':memory:',
						entities: [process.cwd() + '/**/*.entity{.ts,.js}'],
						logging: true,
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

	describe('AppModule', () => {
		it('/GET *', () => {
			return request(app.getHttpServer())
				.get('/rubbish')
				.expect(404)
		})
	})

	describe('StatusModule', () => {
		it('/GET statuses', () => {
			return request(app.getHttpServer())
				.get('/statuses')
				.expect(200)
		});
	})

	afterAll(async () => {
		await app.close();
	});
});