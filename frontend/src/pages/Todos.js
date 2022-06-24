import { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import TodoList from "../components/TodoList";
import { getStatuses } from "../store/reducers/status";
import { getTodos } from "../store/reducers/todo";
import { STATUS_IDS } from "../utilities/global";

export default function Todos() {
	const dispatch = useDispatch();
	const statuses = useSelector(({ statuses }) => statuses)
	const items = useSelector(({ todo }) => todo.data)

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
		// index on drop
		const destinationIndex = result.destination.index;
		// id of dragged item
		const draggableId = result.draggableId;
		let draggedItem = null;

		const currentStatus = statuses.find(status => status.id === sourceStatusId)

		console.log(currentStatus);
	}

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<div className="mx-48 mt-12 flex flex-row justify-between gap-4">
				<TodoList title="To Do" id={STATUS_IDS.TO_DO} items={items[STATUS_IDS.TO_DO]} canAdd={true} />
				<TodoList title="In Progress" id={STATUS_IDS.TO_DO} items={items[STATUS_IDS.IN_PROGRESS]} />
				<TodoList title="Blocked" id={STATUS_IDS.BLOCKED} items={items[STATUS_IDS.BLOCKED]} />
				<TodoList title="In QA" id={STATUS_IDS.IN_QA} items={items[STATUS_IDS.IN_QA]} />
				<TodoList title="Done" id={STATUS_IDS.DONE} items={items[STATUS_IDS.DONE]} />
				<TodoList title="Deployed" id={STATUS_IDS.DEPLOYED} items={items[STATUS_IDS.DEPLOYED]} />
			</div>
		</DragDropContext>
	)
}