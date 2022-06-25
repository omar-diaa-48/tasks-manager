import { useSelector } from "react-redux"
import { STATUS_IDS } from "../utilities/global"

export default function TodosStatistics() {
	const items = useSelector(({ todos }) => todos)

	return (
		<div className="my-4 mx-48">
			{
				items[STATUS_IDS.BLOCKED]?.length && (
					<div className="py-3 px-5 mb-4 bg-red-100 text-red-900 text-sm rounded-md border border-red-200" role="alert">
						{items[STATUS_IDS.BLOCKED]?.length} task/s are blocked!!
					</div>
				)
			}

			{
				items[STATUS_IDS.DEPLOYED]?.length && (
					<div className="py-3 px-5 mb-4 bg-green-100 text-green-900 text-sm rounded-md border border-green-200" role="alert">
						{items[STATUS_IDS.DEPLOYED]?.length} task/s are finished, yaaay!!
					</div>
				)
			}
		</div>
	)
}