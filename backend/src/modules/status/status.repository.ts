
import { EntityRepository } from "typeorm";
import { BaseRepository } from "../base/base-repository";
import { Status } from "./status.entity";

@EntityRepository(Status)
export class StatusRepository extends BaseRepository<Status>{ }