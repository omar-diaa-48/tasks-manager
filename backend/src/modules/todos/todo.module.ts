import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HistoryModule } from "../history/history.module";
import { TodoController } from "./todo.controller";
import { Todo } from "./todo.entity";
import { TodoService } from "./todo.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([Todo]),
		HistoryModule
	],
	controllers: [TodoController],
	providers: [TodoService]
})
export class TodoModule { };