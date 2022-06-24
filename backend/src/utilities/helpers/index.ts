export const generateID = (prefix?: string): string => {
	const timestamp = Date.now();

	return prefix ? `${prefix}_${timestamp}` : `${timestamp}`;
}