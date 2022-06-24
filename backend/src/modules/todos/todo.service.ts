
import { Injectable, NotFoundException } from "@nestjs/common";
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
		return this.repository.findOneBy({ id });
	}

	async addOne(addTodoDTO: AddTodoDTO): Promise<Todo> {
		const record = this.repository.create();

		for (const key in addTodoDTO) {
			const field = addTodoDTO[key];

			if (this.repository.metadata.hasColumnWithPropertyPath(key)) {
				record[key] = field;
			}
		}

		await record.save();

		return record;
	}

	async updateOne(id: number, updateTodoDTO: UpdateTodoDTO): Promise<Todo> {
		const record = await this.repository.findOneBy({ id });

		if (!record) {
			throw new NotFoundException(`${this.repository.metadata.tableName} table has no record with id ${id}`)
		}

		// for every key in the relations to be loaded, check if it exists and update it
		for (const key in updateTodoDTO) {
			if (key !== "id" && this.repository.metadata.hasColumnWithPropertyPath(key)) {
				const field = updateTodoDTO[key];
				record[key] = field
			}
		}

		await record.save()

		return record;
	}

	deleteOne(id: number): Promise<{ id: number }> {
		return this.repository.deleteOne(id);
	}
}