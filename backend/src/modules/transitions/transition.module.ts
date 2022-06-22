import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransitionController } from "./transition.controller";
import { Transition } from "./transition.entity";
import { TransitionService } from "./transition.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([Transition])
	],
	controllers: [TransitionController],
	providers: [
		TransitionService
	]
})
export class TransitionModule { };