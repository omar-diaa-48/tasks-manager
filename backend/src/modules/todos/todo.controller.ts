
import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Todo } from "./todo.entity";
import { TodoService } from "./todo.service";


@ApiTags('todos')
@Controller('todos')
export class TodoController {
	constructor(
		private service: TodoService
	) { }

	@Get()
	getAllEntries(): Promise<Todo[]> {
		return this.service.getAll();
	}

	@Get(':entryId')
	getEntryById(
		@Param("entryId") entryId: number
	): Promise<Todo> {
		return this.service.getById(entryId);
	}
}