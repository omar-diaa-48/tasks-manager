
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetUser } from "src/utilities/decorators/get-user.decorator";
import { JwtPayload } from "src/utilities/types/jwt-payload";
import { History } from "../history/history.entity";
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
	getAllTodos(
		@Query("statusId") statusId?: number
	): Promise<Todo[]> {
		return this.service.getAll(statusId);
	}

	@Get(':todoId')
	getTodoById(
		@Param("todoId") todoId: string
	): Promise<{ todo: Todo, history: History[] }> {
		return this.service.getById(todoId);
	}

	@Post()
	@UsePipes(ValidationPipe)
	addTodo(
		@Body() addTodoDTO: AddTodoDTO,
		@GetUser() user: JwtPayload
	): Promise<Todo> {
		return this.service.addOne(addTodoDTO, user);
	}

	@Put(":todoId/status")
	@UsePipes(ValidationPipe)
	updateTodoStatus(
		@Param("todoId") todoId: string,
		@Body() updateTodoDTO: UpdateTodoDTO,
		@GetUser() user: JwtPayload
	): Promise<Todo> {
		return this.service.updateStatus(todoId, updateTodoDTO, user);
	}

	@Delete(":todoId")
	@UsePipes(ValidationPipe)
	deleteTodo(
		@Param("todoId") todoId: number
	): Promise<{ id: number }> {
		return this.service.deleteOne(todoId);
	}
}