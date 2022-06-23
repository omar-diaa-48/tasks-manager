import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<div className="h-screen w-full flex flex-col justify-center items-center bg-gray-700">
			<h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
			<div className="bg-gray-200 px-2 text-sm rounded rotate-12 absolute">
				Page Not Found
			</div>
			<button onClick={() => navigate("/")} className="mt-5">
				<button
					className="relative inline-block text-sm font-medium text-red-600 group active:text-red-700 focus:outline-none focus:ring"
				>
					<span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 text-red-600 group-hover:translate-y-0 group-hover:translate-x-0"></span>

					<span className="relative block px-8 py-3 bg-gray-200 border border-current">
						<button>Go Home</button>
					</span>
				</button>
			</button>
		</div>
	)
}