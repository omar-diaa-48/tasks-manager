import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity({ name: 'todo', orderBy: { date: 'DESC' } })
export class Todo extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: false,
		length: 100
	})
	name: string;

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

	// @ManyToOne(type => Status)
	// @JoinColumn({ name: 'statusId', referencedColumnName: 'id' })
	// status: Status;

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