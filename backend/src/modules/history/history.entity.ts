import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../status/status.entity";
import { Task } from "../tasks/task.entity";
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

	@ManyToOne(type => Task)
	@JoinColumn({ name: 'task', referencedColumnName: 'id' })
	task: User;

	@Column({
		name: "task"
	})
	taskId: string;

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