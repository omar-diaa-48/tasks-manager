import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Modal from "../components/shared/Modal";
import TodoList from "../components/TodoList";
import { getStatuses } from "../store/reducers/status";
import { getTodos, updateTodo } from "../store/reducers/todos";
import { STATUS_IDS } from "../utilities/global";

export default function Todos() {
	const dispatch = useDispatch();
	const statuses = useSelector(({ status }) => status.data)
	const items = useSelector(({ todos }) => todos)

	const [modal, setModal] = useState({
		isOpen: false,
		todoId: ''
	});

	const handleCloseModal = () => {
		setModal((prevValue) => ({
			...prevValue,
			isOpen: false
		}))
	}

	const handleOpenModal = (todoId) => {
		setModal({
			isOpen: true,
			todoId
		})
	}

	useEffect(() => {

		Promise.all([
			dispatch(getStatuses()),
			dispatch(getTodos())
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

		dispatch(updateTodo({ todoId: draggableId, currentStatusId: currentStatus.id, nextStatusId: transtion.to.id }))
	}

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<div className="mx-48 mt-12 flex flex-row justify-between gap-4">
				<TodoList title="To Do" id={STATUS_IDS.TO_DO} items={items[STATUS_IDS.TO_DO]} canAdd={true} handleOpenTodo={handleOpenModal} />
				<TodoList title="In Progress" id={STATUS_IDS.TO_DO} items={items[STATUS_IDS.IN_PROGRESS]} handleOpenTodo={handleOpenModal} />
				<TodoList title="Blocked" id={STATUS_IDS.BLOCKED} items={items[STATUS_IDS.BLOCKED]} handleOpenTodo={handleOpenModal} />
				<TodoList title="In QA" id={STATUS_IDS.IN_QA} items={items[STATUS_IDS.IN_QA]} handleOpenTodo={handleOpenModal} />
				<TodoList title="Done" id={STATUS_IDS.DONE} items={items[STATUS_IDS.DONE]} handleOpenTodo={handleOpenModal} />
				<TodoList title="Deployed" id={STATUS_IDS.DEPLOYED} items={items[STATUS_IDS.DEPLOYED]} handleOpenTodo={handleOpenModal} />
			</div>
			<Modal isOpen={modal.isOpen} todoId={modal.todoId} handleClose={handleCloseModal} />
		</DragDropContext>
	)
}