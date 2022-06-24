export const generateID = (prefix?: string): string => {
	const timestamp = Date.now();

	return prefix ? `${prefix}_${timestamp}` : `${timestamp}`;
}

/**
 * Groups an array of records by a certain key.
 * @param {any[]} array
 * @param {string} keyId key to filter with 
 */
export const groupByKey = (array: any[], keyId: string): any => {
	const groupedArray = {};

	array.forEach((item) => {
		// check if the key already exists
		const keyGroup = item[keyId]

		if (groupedArray[keyGroup]) {

			groupedArray[keyGroup].push(item)

		}

		else {
			groupedArray[keyGroup] = [item]
		}
	});

	return groupedArray;
}