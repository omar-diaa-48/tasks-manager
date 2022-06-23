import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtStrategy } from './jwt-strategy';
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";


@Module({
	imports: [
		TypeOrmModule.forFeature([User]),

		JwtModule.registerAsync({
			imports: [ConfigService],

			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>("TOKEN_SECRET"),
				signOptions: {
					expiresIn: 3600 * 60
				}
			}),

			inject: [ConfigService]
		}),


	],
	controllers: [UserController],
	providers: [
		JwtStrategy,
		UserService
	]
})
export class UserModule { };