import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signout } from "../store/reducers/user";

export default function NavBar() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const user = useSelector(({ user }) => user.data);
	const [isOpen, setIsOpen] = useState(false)

	const handleSignOut = () => {
		dispatch(signout())
	}

	const renderAuthLinks = () => {
		return user ? (
			<>
				<button onClick={() => navigate("/manage")} className="text-sm font-medium text-gray-200 transition-colors duration-300 transform hover:text-indigo-400">
					Go to tasks
				</button>
				<button onClick={handleSignOut} className="text-sm font-medium text-gray-200 transition-colors duration-300 transform hover:text-indigo-400">
					Signout
				</button>
			</>
		) : (
			<>
				<button onClick={() => navigate("/sign-in")} className="text-sm font-medium text-gray-200 transition-colors duration-300 transform hover:text-indigo-400">
					Signin
				</button>
				<button onClick={() => navigate("/sign-up")} className="text-sm font-medium text-gray-200 transition-colors duration-300 transform hover:text-indigo-400">
					Signup
				</button>
			</>
		)
	}

	return (
		<div className="bg-gray-600">
			<nav className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
				<div className="flex items-center justify-between">
					<a className="text-xl mr-4 font-bold text-white transition-colors duration-300 transform md:text-2xl hover:text-indigo-400" href="/">
						Tasks management application
					</a>
					{
						user && <p className="text-white">Hi {user.username}</p>
					}
					<div onClick={() => setIsOpen(!isOpen)} className="flex md:hidden">
						<button type="button" className="text-gray-200 hover:text-gray-400 focus:outline-none focus:text-gray-400"
							aria-label="toggle menu">
							<svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
								<path fillRule="evenodd"
									d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
								</path>
							</svg>
						</button>
					</div>
				</div>
				<div className={`${isOpen ? 'flex' : 'hidden'} flex-col mt-2 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0`}>
					<button className="text-sm font-medium text-gray-200 transition-colors duration-300 transform hover:text-indigo-400" onClick={() => navigate('/')}>
						Home
					</button>

					{renderAuthLinks()}
				</div>
			</nav >
		</div>
	)
}