
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetUser } from "../../utilities/decorators/get-user.decorator";
import { JwtPayload } from "../../utilities/types/jwt-payload";
import { History } from "../history/history.entity";
import { AddTaskDTO } from "./dto/add-task.dto";
import { UpdateTaskStatusDTO } from "./dto/update-task-status.dto";
import { UpdateTaskDTO } from "./dto/update-task.dto";
import { Task } from "./task.entity";
import { TaskService } from "./task.service";


@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
	constructor(
		private service: TaskService
	) { }

	@Get()
	getAllTasks(
		@Query("statusId") statusId?: number
	): Promise<Task[]> {
		return this.service.getAll(statusId);
	}

	@Get(':taskId')
	getTaskById(
		@Param("taskId") taskId: string
	): Promise<{ task: Task, history: History[] }> {
		return this.service.getById(taskId);
	}

	@Post()
	@UsePipes(ValidationPipe)
	addTask(
		@Body() addTaskDTO: AddTaskDTO,
		@GetUser() user: JwtPayload
	): Promise<Task> {
		return this.service.addOne(addTaskDTO, user);
	}

	@Put(":taskId/status")
	@UsePipes(ValidationPipe)
	updateTaskStatus(
		@Param("taskId") taskId: string,
		@Body() updateTaskDTO: UpdateTaskStatusDTO,
		@GetUser() user: JwtPayload
	): Promise<Task> {
		return this.service.updateStatus(taskId, updateTaskDTO, user);
	}

	@Put(":taskId")
	@UsePipes(ValidationPipe)
	updateTask(
		@Param("taskId") taskId: string,
		@Body() updateTaskDTO: UpdateTaskDTO,
		@GetUser() user: JwtPayload
	): Promise<Task> {
		return this.service.updateOne(taskId, updateTaskDTO, user);
	}

	@Delete(":taskId")
	@UsePipes(ValidationPipe)
	deleteTask(
		@Param("taskId") taskId: number
	): Promise<{ id: number }> {
		return this.service.deleteOne(taskId);
	}
}