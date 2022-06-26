import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTaskById, resetTask } from "../../store/reducers/task";
import { changeTimestampToDate } from "../../utilities";
import { STATUS_VARIANTS } from "../../utilities/global";

export default function Modal({ taskId, handleClose }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const taskItem = useSelector(({ task }) => task)

	useEffect(() => {
		if (taskId) {
			dispatch(getTaskById(taskId))
		}

		if (!taskId) {
			dispatch(resetTask())
		}
	}, [dispatch, taskId])

	const handleEdit = () => {
		navigate(`/tasks/${taskId}`)
	}

	const renderHistory = (history) => {
		if (history.length) {
			return history.map(history => (
				<div key={history.id} className="my-4">
					<p>{changeTimestampToDate(history.date)}</p>
					<p>{history.user?.username} changed the task from {history.prevStatus?.title} to {history.newStatus?.title}</p>
				</div>
			))
		}

		return <div>No History for this task</div>
	}

	return (
		taskItem && (
			<div className={`${taskItem ? 'block' : 'hidden'} fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal`}>
				<div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">

					<div className={`flex justify-between items-center ${STATUS_VARIANTS[taskItem.task?.status?.title]} text-white text-xl rounded-t-md px-4 py-2`}>
						<h3 className="max-w-sm">{taskItem.task.title} made by {taskItem.task.user.username}</h3>
						<button onClick={handleClose}>x</button>
					</div>

					<div className="max-h-48 overflow-y-scroll p-4">
						{renderHistory(taskItem.history)}
					</div>

					<div className="px-4 py-2 border-t border-t-gray-500 flex justify-end items-center space-x-4">
						<button className="bg-cyan-500 text-white px-4 py-2 rounded-md transition" onClick={handleEdit}>Edit</button>
						<button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={handleClose}>Close</button>
					</div>
				</div>
			</div>
		)
	)
}