import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

	// @ManyToOne(type => User)
	// @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
	// user: User;

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