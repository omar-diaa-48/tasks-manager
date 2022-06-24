import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { getStatuses } from "../../../store/reducers/status";
import TaskList from "./TaskList";

export default function Tasks() {
	const dispatch = useDispatch();
	// const statuses = useSelector(({ statuses }) => statuses)

	useEffect(() => {
		dispatch(getStatuses());
	}, [dispatch])

	const [items, setItems] = useState({
		"To Do": [{ id: "T-1", title: "1", description: "Very interesting" }],
		"In Progress": [{ id: "T-2", title: "1" }, { id: "T-11", title: "2" }],
		"Blocked": [{ id: "T-3", title: "1" }, { id: "T-10", title: "2" }],
		"In QA": [{ id: "T-4", title: "1" }, { id: "T-9", title: "2" }],
		"Done": [{ id: "T-5", title: "1" }, { id: "T-8", title: "2" }],
		"Deployed": [{ id: "T-6", title: "1" }, { id: "T-7", title: "2" }, { id: "T-12", title: "3" }, { id: "T-13", title: "4" }]
	});

	const handleDragEnd = (result) => {
		if (!result || !result.source || !result.destination) {
			return;
		}

		// drag source
		const source = result.source.droppableId;
		// drop destination
		const destination = result.destination.droppableId;
		// index on drop
		const destinationIndex = result.destination.index;
		// id of dragged item
		const draggableId = result.draggableId;
		let draggedItem = null;

		const freshItems = { ...items };
		const itemsKeys = Object.keys(freshItems);

		for (let i = 0; i < itemsKeys.length; i++) {
			// current key (To Do, In Progress, etc...)
			const key = itemsKeys[i];

			if (key === source) {

				// if drag and drop are not on the same list
				if (source !== destination) {
					draggedItem = freshItems[key].find((item) => item.id === draggableId);
					freshItems[key] = freshItems[key].filter((item) => item.id !== draggableId);


					// position the item in the right index
					freshItems[destination] = [...freshItems[destination].slice(0, destinationIndex), draggedItem, ...freshItems[destination].slice(destinationIndex)]
				}
			}

		}

		setItems(freshItems)
	}

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<div className="mx-48 mt-12 flex flex-row justify-between gap-4">
				<TaskList title="To Do" items={items["To Do"]} canAdd={true} />
				<TaskList title="In Progress" items={items["In Progress"]} />
				<TaskList title="Blocked" items={items["Blocked"]} />
				<TaskList title="In QA" items={items["In QA"]} />
				<TaskList title="Done" items={items["Done"]} />
				<TaskList title="Deployed" items={items["Deployed"]} />
			</div>
		</DragDropContext>
	)
}