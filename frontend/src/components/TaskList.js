import { Droppable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import { STATUS_VARIANTS } from "../utilities/global";
import TaskItem from "./TaskItem";

export default function TaskList({ id, title, items, canAdd, handleOpenTask }) {
	const navigate = useNavigate();

	return (
		<Droppable droppableId={title}>
			{(provided) => (
				<div className={`w-full h-min rounded ${STATUS_VARIANTS[title]} p-2`}>
					<div className="flex justify-between py-1">
						<h3 className="text-lg">{title}</h3>
					</div>

					<div className="m-4 text-sm mt-2" {...provided.droppableProps} ref={provided.innerRef}>
						{
							items?.map((item, index) => (
								<TaskItem key={item.id} id={item.id} index={index} time={item.date} owner={item.user.username} title={item.title} description={item.description} handleOpenTask={handleOpenTask} />
							))
						}
					</div>

					{canAdd && <button className="mt-3" onClick={() => navigate("/tasks/new")}>Add a card...</button>}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	)
}

TaskList.defaultProps = {
	canAdd: false
}