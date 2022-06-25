import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { signin } from "../store/reducers/user"

export default function SigninModal() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [formValues, setFormValues] = useState({
		username: "",
		password: ""
	})

	const handleChange = (e) => {
		setFormValues((prevValues) => ({
			...prevValues,
			[e.target.name]: e.target.value
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(signin(formValues))
			.then(({ payload }) => {
				if(payload){
					navigate("/")
				}
			})
	}

	return (
		<div className="min-h-screen flex justify-center">
			<form onSubmit={handleSubmit} className="max-w-md mt-24">
				<div className="mb-4">
					<label className="block text-md font-light mb-2" htmlFor="username">Username</label>
					<input className="w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline" type="text" name="username"
						placeholder="Username" value={formValues.username} onChange={handleChange} />
				</div>
				<div className="mb-4">
					<label className="block text-md font-light mb-2" htmlFor="password">Password</label>
					<input className="w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange} />
				</div>

				<div className="flex items-center justify-between mb-5">
					<button className="bg-indigo-600 hover:bg-blue-700 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline" type="submit">
						SIGN IN
					</button>
				</div>
				<p className="text-center text-md font-light">Don't have an account? <button onClick={() => navigate("/sign-up")} className="font-light text-md text-indigo-600">Create</button></p>
			</form>
		</div>
	)
}