import { Draggable } from 'react-beautiful-dnd';

export default function TodoItem({ id, index, title, owner, description, time }) {
	return (
		<Draggable key={id} draggableId={id} index={index}>
			{(provided) => (
				<div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter"
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<p className='mb-4 bg-slate-200'>{owner} @ {title}</p>
					<p className='mb-2'>{time}</p>
					<p>{description}</p>
				</div>
			)}
		</Draggable >
	)
}