import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/shared/Input";
import Select from "../components/shared/Select";
import TextArea from "../components/shared/TextArea";
import NotFound from "../pages/NotFound";
import { getTaskById, resetTask } from "../store/reducers/task";
import { addTask } from "../store/reducers/tasks";
import { getUsers } from "../store/reducers/users";

export default function Task() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { taskId } = useParams();

	const user = useSelector(({ user }) => user.data);
	const users = useSelector(({ users }) => users);
	useEffect(() => {
		dispatch(getUsers())
	}, [dispatch])

	useEffect(() => {
		if (taskId === "new") {
			dispatch(resetTask({
				title: "",
				description: "",
				assigneeId: user.id,
				statusId: 1
			}))
		}

		else {
			dispatch(getTaskById(taskId))
				.then(({ payload }) => {
					console.log(payload);
					if (payload) {
						setFormValues(payload.task)
					}
				})
		}
	}, [dispatch, taskId, user])

	const [formValues, setFormValues] = useState({
		title: "",
		description: "",
		assigneeId: user.id,
		statusId: 1
	})

	const handleChange = (e) => {
		setFormValues((prevValue) => ({
			...prevValue,
			[e.target.name]: e.target.value
		}))
	}

	const handleTask = () => {
		dispatch(addTask(formValues))
			.then(() => {
				navigate("/tasks")
			})
	}

	if (!formValues) {
		return (
			<NotFound />
		)
	}

	return (
		<div className="p-4 flex flex-col justify-center min-h-screen max-w-md mx-auto">
			<div className="p-6 bg-sky-300 rounded">

				<div className="flex items-center justify-center font-black m-3 mb-12">
					<h1 className="tracking-wide text-3xl text-gray-900">Track your tasks</h1>
				</div>

				<Select handleChange={handleChange} value={formValues.assigneeId} name="assigneeId" title="Assignee" options={users} valueKey="id" valueTitle="username" />

				<Input type="text" handleChange={handleChange} value={formValues.title} name="title" title="Title" />

				<TextArea handleChange={handleChange} value={formValues.description} name="description" title="Description" />

				<button onClick={handleTask} className="px-4 py-1.5 rounded-md shadow-lg bg-gradient-to-r from-pink-600 to-red-600 font-medium text-gray-100 block transition duration-300">
					<span>Task</span>
				</button>

			</div>
		</div>
	)
} 