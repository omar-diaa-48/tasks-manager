
import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AddTodoDTO } from "./dto/add-todo.dto";
import { UpdateTodoDTO } from "./dto/update-todo.dto";
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

	@Post()
	@UsePipes(ValidationPipe)
	addTodo(
		@Body() addTodoDTO: AddTodoDTO
	): Promise<Todo> {
		return this.service.addOne(addTodoDTO);
	}

	@Put()
	@UsePipes(ValidationPipe)
	updateTodo(
		@Body() updateTodoDTO: UpdateTodoDTO
	): Promise<Todo> {
		return this.service.updateOne(updateTodoDTO);
	}

	@Delete(":todoId")
	@UsePipes(ValidationPipe)
	deleteTodo(
		@Param("todoId") todoId: number
	): Promise<{ id: number }> {
		return this.service.deleteOne(todoId);
	}
}