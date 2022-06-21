
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
	getAllTodos(): Promise<Todo[]> {
		return this.service.getAll();
	}

	@Get(':todoId')
	getTodoById(
		@Param("todoId") todoId: number
	): Promise<Todo> {
		return this.service.getById(todoId);
	}
}