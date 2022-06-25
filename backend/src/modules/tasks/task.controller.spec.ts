import { Test } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

describe('TaskController', () => {
	let taskController: TaskController;
	let taskService: TaskService;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [TaskController],
			providers: [TaskService],
		}).compile();

		taskService = moduleRef.get<TaskService>(TaskService);
		taskController = moduleRef.get<TaskController>(TaskController);
	});

	// describe('getAll', () => {
	// 	it('should return an array of task', async () => {
	// 		const result = [];
	// 		jest.spyOn(taskService, 'getAll').mockImplementation(() => result);

	// 		expect(await taskController.getAllTasks()).toBe(result);
	// 	});
	// });
});