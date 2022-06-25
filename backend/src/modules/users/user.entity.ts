import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../tasks/task.entity";

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

	@OneToMany(() => Task, task => task.user)
	tasks: Task[];
}