import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../status/status.entity";
import { User } from "../users/user.entity";

@Entity({ name: 'history', orderBy: { date: 'DESC' } })
export class History extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(type => User)
	@JoinColumn({ name: 'user', referencedColumnName: 'id' })
	user: User;

	@Column({
		name: "user"
	})
	userId: number;

	@ManyToOne(type => User)
	@JoinColumn({ name: 'todo', referencedColumnName: 'id' })
	todo: User;

	@Column({
		name: "todo"
	})
	todoId: string;

	@ManyToOne(type => Status)
	@JoinColumn({ name: 'prevStatus', referencedColumnName: 'id' })
	prevStatus: Status;

	@Column({
		name: "prevStatus"
	})
	prevStatusId: number;

	@ManyToOne(type => Status)
	@JoinColumn({ name: 'newStatus', referencedColumnName: 'id' })
	newStatus: Status;

	@Column({
		name: "newStatus"
	})
	newStatusId: number;

	@Column({
		nullable: false,
		default: Date.now(),
		type: "bigint"
	})
	date: number;
}