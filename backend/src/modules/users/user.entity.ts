import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Todo } from "../todos/todo.entity";

@Entity({ name: 'user', orderBy: { date: 'DESC' } })
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: false,
		length: 100
	})
	username: string;

	@Column({
		nullable: false
	})
	password: string;

	// @ManyToOne(type => User)
	// @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
	// user: User;

	@OneToMany(() => Todo, todo => todo.user)
	todos: Todo[];

	// @ManyToOne(type => Status)
	// @JoinColumn({ name: 'statusId', referencedColumnName: 'id' })
	// status: Status;
}