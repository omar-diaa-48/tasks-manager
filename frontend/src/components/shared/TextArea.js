export default function TextArea({ type, name, title, value, handleChange }) {
	return (
		<div>
			<label htmlFor={name} className="text-sm font-medium">{title}</label>
			<textarea name={name} onChange={handleChange} value={value} className="mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400"></textarea>
		</div>
	)
}