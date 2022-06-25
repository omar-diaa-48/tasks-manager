import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodoById, resetTodo } from "../../store/reducers/todo";

export default function Modal({ todoId, isOpen, handleClose }) {
	const dispatch = useDispatch();

	const todo = useSelector(({ todo }) => todo)

	useEffect(() => {
		if (isOpen && todoId) {
			dispatch(getTodoById(todoId))
		}

		if (!isOpen || !todoId) {
			dispatch(resetTodo())
		}
	}, [dispatch, isOpen, todoId])

	return (
		todo && (
			<div className={`${isOpen ? 'block' : 'none'} fixed hidden z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal`}>
				<div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">

					<div className="flex justify-between items-center bg-green-500 text-white text-xl rounded-t-md px-4 py-2">
						<h3>{todo.title}</h3>
						<button onclick={handleClose}>x</button>
					</div>

					{/* <div className="max-h-48 overflow-y-scroll p-4">
						{
							todo.history.map(history => (
								<p>{history.userId}</p>
							))
						}
					</div> */}

					<div className="px-4 py-2 border-t border-t-gray-500 flex justify-end items-center space-x-4">
						<button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onclick={handleClose}>Close (ESC)</button>
					</div>
				</div>
			</div>
		)
	)
}