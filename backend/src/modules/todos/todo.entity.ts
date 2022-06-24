import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Status } from "../status/status.entity";
import { User } from "../users/user.entity";

@Entity({ name: 'todo', orderBy: { date: 'DESC' } })
export class Todo extends BaseEntity {
	@PrimaryColumn()
	id: string;

	@Column({
		nullable: false,
		length: 100
	})
	title: string;

	@Column({
		nullable: false,
		length: 255
	})
	description: string;

	@OneToOne(type => User)
	@JoinColumn({ name: 'user', referencedColumnName: 'id' })
	user: User;

	@Column({
		name: "user"
	})
	userId: number;

	@OneToOne(type => Status)
	@JoinColumn({ name: 'status', referencedColumnName: 'id' })
	status: Status;

	@Column({
		name: "status"
	})
	statusId: number;

	@Column({
		default: false
	})
	is_deleted: boolean;

	@Column({
		nullable: false,
		default: Date.now(),
		type: "bigint"
	})
	date: number;
}