import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Modal from "../components/shared/Modal";
import TaskList from "../components/TaskList";
import TasksStatistics from "../components/TasksStatistics";
import { getStatuses } from "../store/reducers/status";
import { getTasks, updateTaskStatus } from "../store/reducers/tasks";
import { STATUS_IDS } from "../utilities/global";

export default function Tasks() {
	const dispatch = useDispatch();
	const statuses = useSelector(({ status }) => status.data)
	const items = useSelector(({ tasks }) => tasks)

	const [selectedTaskId, setSelectedTaskId] = useState('');

	const handleCloseModal = () => {
		setSelectedTaskId(false)
	}

	const handleOpenModal = (taskId) => {
		setSelectedTaskId(taskId)
	}

	useEffect(() => {

		Promise.all([
			dispatch(getStatuses()),
			dispatch(getTasks())
		])

	}, [dispatch])

	const handleDragEnd = (result) => {
		if (!result || !result.source || !result.destination) {
			return;
		}

		// drag source
		const sourceStatusId = result.source.droppableId;
		// drop destination
		const destinationStatusId = result.destination.droppableId;
		// id of dragged item
		const draggableId = result.draggableId;

		// check on the current status if available
		const currentStatus = statuses.find(status => status.title === sourceStatusId)

		if (!currentStatus) {
			toast.error("Invalid Action");
			return;
		}

		// check if the next status is allowed
		const transtion = currentStatus.fromTransitions.find(transtion => transtion.to.title === destinationStatusId);

		if (!transtion) {
			toast.error("Invalid Action");
			return;
		}

		dispatch(updateTaskStatus({ taskId: draggableId, currentStatusId: currentStatus.id, nextStatusId: transtion.to.id }))
	}

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<TasksStatistics />

			<div className="mx-12 md:mx-24 lg:mx:48 mt-12 flex flex-col lg:flex-row lg:justify-between gap-4">
				<TaskList title="To Do" id={STATUS_IDS.TO_DO} items={items[STATUS_IDS.TO_DO]} canAdd={true} handleOpenTask={handleOpenModal} />
				<TaskList title="In Progress" id={STATUS_IDS.TO_DO} items={items[STATUS_IDS.IN_PROGRESS]} handleOpenTask={handleOpenModal} />
				<TaskList title="Blocked" id={STATUS_IDS.BLOCKED} items={items[STATUS_IDS.BLOCKED]} handleOpenTask={handleOpenModal} />
				<TaskList title="In QA" id={STATUS_IDS.IN_QA} items={items[STATUS_IDS.IN_QA]} handleOpenTask={handleOpenModal} />
				<TaskList title="Done" id={STATUS_IDS.DONE} items={items[STATUS_IDS.DONE]} handleOpenTask={handleOpenModal} />
				<TaskList title="Deployed" id={STATUS_IDS.DEPLOYED} items={items[STATUS_IDS.DEPLOYED]} handleOpenTask={handleOpenModal} />
			</div>
			{selectedTaskId && <Modal taskId={selectedTaskId} handleClose={handleCloseModal} />}
		</DragDropContext>
	)
}