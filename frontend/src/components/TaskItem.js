import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaClock } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { changeTimestampToDate } from '../utilities';

export default function TaskItem({ id, index, title, owner, description, time, handleOpenTask }) {
	const user = useSelector(({ user }) => user.data);

	const [isOver, setIsOver] = useState(false)

	const handleMouseOver = (isOver) => {
		setIsOver(isOver)
	}

	return (
		<Draggable key={id} draggableId={id} index={index}>
			{(provided) => (
				<div
					className="bg-white p-2 rounded mt-1 cursor-pointer border-b border-grey hover:bg-grey-lighter"
					onMouseOver={() => handleMouseOver(true)}
					onMouseLeave={() => handleMouseOver(false)}
					onClick={() => handleOpenTask(id, title)}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<p className={`mb-4 bg-slate-100 ${user.username !== owner && "text-stone-500"}`}>{owner} @ {title}</p>
					<div className='flex flex-row items-center mb-2'>
						<FaClock className='mr-2' />
						<p>{changeTimestampToDate(time)}</p>
					</div>
					<p>{(user.username !== owner && !isOver) ? "" : description}</p>
				</div>
			)}
		</Draggable >
	)
}