import { Draggable } from 'react-beautiful-dnd';

export default function TaskItem({ id, index, title, description }) {
	return (
		<Draggable key={id} draggableId={id} index={index}>
			{(provided) => (
				<div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter"
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					{title}
					<br />
					{description}
				</div>
			)}
		</Draggable >
	)
}