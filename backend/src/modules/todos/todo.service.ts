
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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
}