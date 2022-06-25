export default function TipsSection() {
	return (
		<section className="bg-white">
			<div className="max-w-5xl px-6 py-16 mx-auto">
				<div className="items-center md:flex md:space-x-6">
					<div className="md:w-1/2">
						<h3 className="text-2xl font-semibold text-gray-800">Why?</h3>
						<p className="max-w-md mt-4 text-gray-600">
							From roadmaps to workflows, power team collaboration.
							<br />
							Create a task, monitor it's progress and eventually the whole project
						</p>
						<a href="tel:+xxxxx" className="block mt-8 text-indigo-700 underline">Want to make a quick call?</a>
					</div>

					<div className="mt-8 md:mt-0 md:w-1/2">
						<div className="flex items-center justify-center">
							<div className="max-w-md">
								<img className="object-cover object-center w-full rounded-md shadow" style={{ height: "500px" }} alt="healthy-people"
									src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1039&q=80" />
									
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}