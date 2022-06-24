import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskList from "./TaskList";

export default function Tasks() {
	const [items, setItems] = useState({
		"To Do": [{ id: "T-1", title: "1", description:"Very interesting" }],
		"In Progress": [{ id: "T-2", title: "1" }, { id: "T-11", title: "2" }],
		"Blocked": [{ id: "T-3", title: "1" }, { id: "T-10", title: "2" }],
		"In QA": [{ id: "T-4", title: "1" }, { id: "T-9", title: "2" }],
		"Done": [{ id: "T-5", title: "1" }, { id: "T-8", title: "2" }],
		"Deployed": [{ id: "T-6", title: "1" }, { id: "T-7", title: "2" }, { id: "T-12", title: "3" }, { id: "T-13", title: "4" }]
	});

	const handleDragEnd = (result) => {
		console.log(result);

		// drag source
		const source = result.source.droppableId;
		// drop destination
		const destination = result.destination.droppableId;
		// index on drop
		const destinationIndex = result.destination.index;
		// id of dragged item
		const draggableId = result.draggableId;
		let draggedItem = null;

		const freshItems = {};
		const itemsKeys = Object.keys(items);

		for (let i = 0; i < itemsKeys.length; i++) {
			const key = itemsKeys[i];

			if (key === source) {

				if (source !== destination) {
					draggedItem = items[key].find((item) => item.id !== draggableId);
					freshItems[key] = items[key].filter((item) => item.id !== draggableId);


					freshItems[destination] = [...items[destination].slice(0, destinationIndex), draggedItem, ...items[destination].slice(destinationIndex)]
				}

				else {
					freshItems[key] = items[key];
				}
			}

			else {
				freshItems[key] = items[key];
			}

		}

		setItems(freshItems)
	}

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<div className="mx-48 mt-12 flex flex-row justify-between gap-4">
				<TaskList title="To Do" items={items["To Do"]} />
				<TaskList title="In Progress" items={items["In Progress"]} />
				<TaskList title="Blocked" items={items["Blocked"]} />
				<TaskList title="In QA" items={items["In QA"]} />
				<TaskList title="Done" items={items["Done"]} />
				<TaskList title="Deployed" items={items["Deployed"]} />
			</div>
		</DragDropContext>
	)
}