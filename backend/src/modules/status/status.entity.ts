import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transition } from "../transitions/transition.entity";

@Entity({ name: 'status', orderBy: { id: 'ASC' } })
export class Status extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: false,
		length: 100
	})
	name: string;

	@OneToMany(() => Transition, transition => transition.from)
	fromTransitions: Transition[];

	@OneToMany(() => Transition, transition => transition.to)
	toTransitions: Transition[];
}