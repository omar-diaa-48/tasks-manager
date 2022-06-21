
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "../base/base-repository";
import { AddTodoDTO } from "./dto/add-todo.dto";
import { UpdateTodoDTO } from "./dto/update-todo.dto";
import { Todo } from "./todo.entity";

@Injectable()
export class TodoService {
	constructor(
		@InjectRepository(Todo)
		private repository: BaseRepository<Todo>
	) { }

	getAll(): Promise<Todo[]> {
		return this.repository.getAll();
	}

	getById(id: number): Promise<Todo> {
		return this.repository.getById(id);
	}

	addOne(addTodoDTO: AddTodoDTO): Promise<Todo> {
		return this.repository.addOne(addTodoDTO);
	}

	updateOne(id: number, updateTodoDTO: UpdateTodoDTO): Promise<Todo> {
		return this.repository.updateOne(id, updateTodoDTO);
	}

	deleteOne(id: number): Promise<{ id: number }> {
		return this.repository.deleteOne(id);
	}
}