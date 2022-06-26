import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { Connection } from "mysql2";

@Injectable()
export class DatabaseService {
	constructor(@InjectDataSource() private readonly connecton: Connection) { }

	getDb() {
		return this.connecton;
	}
}