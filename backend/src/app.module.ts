import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { IsAuthenticatedMiddleware } from './middlewares/is-authenticated.middleware';
import modules from './modules';

@Module({
	imports: [
		// configure .env file parser
		ConfigModule.forRoot({
			isGlobal: true
		}),

		// configure database configuration
		TypeOrmModule.forRootAsync({
			useFactory: async (configService: ConfigService) => {
				console.log(process.env.NODE_ENV);


				if (process.env.NODE_ENV === "testing") {
					return {
						type: 'sqlite',
						database: ':memory:',
						entities: [process.cwd() + '/**/*.entity{.ts,.js}'],
						synchronize: true,
					}
				}

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