import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../status/status.entity";

@Entity({ name: 'transition', orderBy: { id: 'ASC' } })
export class Transition extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: false,
		length: 100
	})
	name: string;

	@ManyToOne(() => Status, (status) => status.transitions)
	@JoinColumn({
		name: 'from'
	})
	from: Transition;
}