import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'status', orderBy: { id: 'ASC' } })
export class Status extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: false,
		length: 100
	})
	name: string;
}