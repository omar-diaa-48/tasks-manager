import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Status } from "../status/status.entity";
import { User } from "../users/user.entity";

@Entity({ name: 'task', orderBy: { date: 'DESC' } })
export class Task extends BaseEntity {
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

	@ManyToOne(type => User)
	@JoinColumn({ name: 'user', referencedColumnName: 'id' })
	user: User;

	@Column({
		name: "user"
	})
	userId: number;

	@ManyToOne(type => Status)
	@JoinColumn({ name: 'status', referencedColumnName: 'id' })
	status: Status;

	@Column({
		name: "status"
	})
	statusId: number;

	@Column({
		nullable: false,
		default: Date.now(),
		type: "bigint"
	})
	date: number;
}