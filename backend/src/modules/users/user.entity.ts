import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Todo } from "../todos/todo.entity";

@Entity({ name: 'user', orderBy: { id: 'ASC' } })
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: false,
		length: 100
	})
	username: string;

	@Column({
		nullable: false,
		select: false
	})
	password: string;

	@OneToMany(() => Todo, todo => todo.user)
	todos: Todo[];
}