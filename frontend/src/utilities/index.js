export const changeTimestampToDate = (timestamp) => {
	const date = new Date(parseInt(timestamp));

	return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}@${date.getHours()}:${date.getMinutes()}`
}