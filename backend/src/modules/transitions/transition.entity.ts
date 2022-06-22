import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../status/status.entity";

@Entity({ name: 'transition', orderBy: { id: 'ASC' } })
export class Transition extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;
	
	@ManyToOne(() => Status, (status) => status.fromTransitions)
	@JoinColumn({
		name: 'from'
	})
	from: Transition;

	@ManyToOne(() => Status, (status) => status.toTransitions)
	@JoinColumn({
		name: 'to'
	})
	to: Transition;
}