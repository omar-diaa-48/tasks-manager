import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
	const navigate = useNavigate()

	const user = useSelector(({ user }) => user.data);

	const renderLinks = () => {
		return user ? (
			<div className="flex flex-col justify-between items-center mt-8">
				<button onClick={() => navigate("/submit")} className="text-xl font-medium tracking-wider text-green-300 hover:text-green-500">
					Try it out
				</button>
			</div>
		) : (
			<div className="flex flex-col justify-between items-center mt-8">
				<p className="text-xl font-medium tracking-wider text-green-300">Want to try?</p>
				<button onClick={() => navigate("/sign-in")} className="px-8 py-2 text-lg font-medium text-white transition-colors duration-300 transform bg-indigo-600 rounded hover:bg-indigo-500">
					Signin
				</button>
				<button onClick={() => navigate("/sign-up")} className="px-8 py-2 text-lg font-medium text-white transition-colors duration-300 transform">
					Or create an account
				</button>
			</div>
		)
	}

	return (
		<header className="bg-gray-700">
			<section className="flex items-center justify-center" style={{ height: "500px" }}>
				<div className="text-center">
					<p className="text-xl font-medium tracking-wider text-gray-300">Track and manage your tasks in few clicks</p>
					<h2 className="mt-6 mb-6 text-xl font-bold text-white md:text-2xl">
						We also want to acknowledge that tasks management are complex subjects,
						<br />
						we invite you gain a broader perspective by reading our exploration and using our tools.
					</h2>
					{renderLinks()}
				</div>
			</section>
		</header >
	)
}