export default function Input({ type, name, title, value, handleChange }) {
	return (
		<div>
			<label htmlFor={name} className="text-sm font-medium" >{title}</label>
			<input name={name} onChange={handleChange} value={value} className="mb-3 px-2 py-1.5 mt-1 block w-full border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400" type={type} />
		</div>
	)
}