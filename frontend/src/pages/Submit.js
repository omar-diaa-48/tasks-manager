import { useState } from "react";

export default function Submit() {
	const [formValues, setFormValues] = useState({
		title: "",
		description: "",
		statusId: 1
	})

	const handleSubmit = () => { }

	return (
		<div className="p-4 flex flex-col justify-center min-h-screen max-w-md mx-auto">
			<div className="p-6 bg-sky-300 rounded">

				<div className="flex items-center justify-center font-black m-3 mb-12">
					<h1 className="tracking-wide text-3xl text-gray-900">Track your tasks</h1>
				</div>

				<button onClick={handleSubmit} className="px-4 py-1.5 rounded-md shadow-lg bg-gradient-to-r from-pink-600 to-red-600 font-medium text-gray-100 block transition duration-300">
					<span>Submit</span>
				</button>

			</div>
		</div>
	)
} 