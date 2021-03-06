import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { signup } from "../store/reducers/user";

const schema = yup.object().shape({
	username: yup.string().required('You must enter a username'),
	password: yup.string().required('Please enter a valid password').min(8, 'Password is too short - should be 8 chars minimum.')
});

export default function SignupModal() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formValues, setFormValues] = useState({
		username: "",
		password: ""
	})

	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (e) => {
		setFormValues((prevValues) => ({
			...prevValues,
			[e.target.name]: e.target.value
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		schema.validate(formValues)
			.then(() => {
				dispatch(signup(formValues))
					.then(({ payload }) => {
						if (payload) {
							navigate("/")
						}
					})
			})
			.catch((error) => {
				setErrorMessage(error.message)
			})
	}

	return (
		<div className="flex justify-center items-center">
			<form onSubmit={handleSubmit} className="max-w-md mt-24">
				{errorMessage && (
					<div className="py-3 px-5 mb-4 bg-red-100 text-red-900 text-sm rounded-md border border-red-200" role="alert">
						{errorMessage}
					</div>
				)}

				<div className="mb-4">
					<label className="block text-md font-light mb-2" htmlFor="username">Username</label>
					<input className="w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline" type="text" name="username"
						onChange={handleChange} value={formValues.username} placeholder="Username" />
				</div>
				<div className="mb-4">
					<label className="block text-md font-light mb-2" htmlFor="password">Password</label>
					<input className="w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline" type="password" name="password"
						onChange={handleChange} value={formValues.password} placeholder="Password" />
				</div>

				<div className="flex items-center justify-between mb-5">
					<button className="bg-indigo-600 hover:bg-blue-700 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline" type="submit">
						SIGN UP
					</button>
				</div>
				<p className="text-center text-md font-light">Already have an account? <button onClick={() => navigate("/sign-in")} className="font-light text-md text-indigo-600" href="/sign-in">Sign in</button></p>
			</form>
		</div>
	)
}