import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";

export default function TaskList({ title, items }) {
	const variants = {
		"To Do": "bg-slate-200",
		"In Progress": "bg-orange-200",
		"Blocked": "bg-red-400",
		"In QA": "bg-orange-300",
		"Done": "bg-green-200",
		"Deployed": "bg-green-300"
	}

	return (

		<Droppable droppableId={title}>
			{(provided) => (
				<div className={`w-full h-min rounded ${variants[title]} p-2`}>
					<div className="flex justify-between py-1">
						<h3 className="text-lg">{title}</h3>
					</div>

					<ul className="m-4 text-sm mt-2" {...provided.droppableProps} ref={provided.innerRef}>
						{
							items.map((item, index) => (
								<TaskItem key={item.id} id={item.id} index={index} title={item.title} description={item.description} />
							))
						}
					</ul>
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	)
}