import { BadRequestException, NotFoundException } from "@nestjs/common";
import { BaseEntity, Repository } from "typeorm";

export class BaseRepository<TEntity extends BaseEntity> extends Repository<TEntity> implements IBaseRepository<TEntity> {
	async getAll(relationsToLoad: string[] = []): Promise<TEntity[]> {
		return this.find({ relations: relationsToLoad });
	}

	async getById(recordId: number, relationsToLoad: string[] = []): Promise<TEntity> {
		this.checkRecordIdOrFail(recordId);

		const findConditions: any = {
			where: {
				id: recordId
			},
			relations: relationsToLoad
		}

		const record = await this.findOne(findConditions);

		if (!record) {
			throw new NotFoundException(`${this.metadata.tableName} table has no record with id ${recordId}`)
		}

		return record;
	}

	async updateOne(recordId: number, updateDto: object): Promise<TEntity> {
		this.checkRecordIdOrFail(recordId);

		const findConditions: any = {
			where: {
				id: recordId
			}
		}

		const record = await this.findOne(findConditions);

		if (!record) {
			throw new NotFoundException(`${this.metadata.tableName} table has no record with id ${recordId}`)
		}

		// for every key in the relations to be loaded, check if it exists and update it
		for (const key in updateDto) {
			if (key !== "id" && this.metadata.hasColumnWithPropertyPath(key)) {
				const field = updateDto[key];
				record[key] = field
			}
		}

		await record.save()

		return record;
	}

	async addOne(createDto: object): Promise<TEntity> {
		const record = this.create();

		// for every key in the relations to be loaded, check if it exists and add it
		for (const key in createDto) {
			const field = createDto[key];

			if (this.metadata.hasColumnWithPropertyPath(key)) {
				record[key] = field;
			}
		}

		await record.save();

		return record;
	}

	async deleteOne(recordId: number): Promise<{
		id: number
	}> {
		this.checkRecordIdOrFail(recordId);

		const findConditions: any = {
			where: {
				id: recordId
			}
		}

		const record = await this.findOne(findConditions);

		if (!record) {
			throw new NotFoundException(`${this.metadata.tableName} table has no record with id ${recordId}`)
		}

		// extract id to return it to the frontend and update ui
		const id = record["id"]

		await record.remove();

		return {
			id
		};
	}

	checkRecordIdOrFail(recordId: number): void {
		if (!recordId || typeof recordId === "undefined" || recordId === null) {
			throw new BadRequestException('Record id sent is not valid')
		}
	}
}

export interface IBaseRepository<T> {
	getAll(relationsToLoad: string[]): Promise<T[]>

	getById(recordId: number, relationsToLoad: string[]): Promise<T>

	updateOne(recordId: number, updateDto: object): Promise<T>

	deleteOne(recordId: number): Promise<{ id: number }>

	checkRecordIdOrFail(recordId: number): void
}