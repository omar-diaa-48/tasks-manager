
import { Injectable, NotImplementedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddTodoDTO } from "./dto/add-todo.dto";
import { UpdateTodoDTO } from "./dto/update-todo.dto";
import { Todo } from "./todo.entity";

@Injectable()
export class TodoService {
	constructor(
		@InjectRepository(Todo)
		private repository: Repository<Todo>
	) { }

	getAll(): Promise<Todo[]> {
		return this.repository.find();
	}

	getById(id: number): Promise<Todo> {
		return this.repository.findOne({ where: { id } });
	}

	addOne(addTodoDTO: AddTodoDTO): Promise<Todo> {
		throw new NotImplementedException();
		// return this.repository.create(addTodoDTO)
	}

	updateOne(updateTodoDTO: UpdateTodoDTO): Promise<Todo> {
		throw new NotImplementedException();
		// return this.repository.update(updateTodoDTO)
	}

	deleteOne(id: number): Promise<{ id: number }> {
		throw new NotImplementedException();
		// return this.repository.delete(id)
	}
}