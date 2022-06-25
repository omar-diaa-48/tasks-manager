import { Droppable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import { STATUS_VARIANTS } from "../utilities/global";
import TodoItem from "./TodoItem";

export default function TodoList({ id, title, items, canAdd, handleOpenTodo }) {
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
								<TodoItem key={item.id} id={item.id} index={index} time={item.date} owner={item.user.username} title={item.title} description={item.description} handleOpenTodo={handleOpenTodo} />
							))
						}
					</div>

					{canAdd && <button className="mt-3" onClick={() => navigate("/submit")}>Add a card...</button>}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	)
}

TodoList.defaultProps = {
	canAdd: false
}