import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transition } from "./transition.entity";
import { TransitionService } from "./transition.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([Transition])
	],
	controllers: [],
	providers: [TransitionService]
})
export class TransitionModule { };