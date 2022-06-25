import { Draggable } from 'react-beautiful-dnd';
import { changeTimestampToDate } from '../utilities';

export default function TaskItem({ id, index, title, owner, description, time, handleOpenTask }) {
	return (
		<Draggable key={id} draggableId={id} index={index}>
			{(provided) => (
				<div onClick={() => handleOpenTask(id, title)} className="bg-white p-2 rounded mt-1 cursor-pointer border-b border-grey hover:bg-grey-lighter"
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<p className='mb-4 bg-slate-200'>{owner} @ {title}</p>
					<p className='mb-2'>{changeTimestampToDate(time)}</p>
					<p>{description}</p>
				</div>
			)}
		</Draggable >
	)
}