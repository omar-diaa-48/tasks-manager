import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { IsAuthenticatedMiddleware } from './middlewares/is-authenticated.middleware';
import modules from './modules';
import { DatabaseModule } from './modules/database/database.module';

@Module({
	imports: [
		// configure .env file parser
		ConfigModule.forRoot({
			isGlobal: true
		}),

		// configure database configuration
		TypeOrmModule.forRootAsync({
			useFactory: async (configService: ConfigService) => {
				return {
					type: 'mysql',
					host: configService.get<string>("DB_HOST"),
					port: configService.get<number>("DB_PORT"),
					username: configService.get<string>("DB_USERNAME"),
					password: configService.get<string>("DB_PASSWORD"),
					database: configService.get<string>("DB_NAME"),
					entities: [__dirname + '/**/*.entity{.ts,.js}'],
					synchronize: true,
				}
			},

			inject: [ConfigService]
		}),

		DatabaseModule,

		...modules
	],
	controllers: [],
	providers: [],
})

export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(IsAuthenticatedMiddleware)
			.forRoutes('/')
	}
}