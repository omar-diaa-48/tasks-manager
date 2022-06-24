export default function Select({ name, title, value, handleChange, options, valueKey, valueTitle }) {
	return (
		<div>
			<label htmlFor={name} className="text-sm font-medium" >{title}</label>
			<select name={name} onChange={handleChange} value={value} className="appearance-none w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out">
				{
					options.map((option) => (
						<option key={option[valueKey]} value={option[valueKey]}>{option[valueTitle]}</option>
					))
				}
			</select>
		</div>
	)
}