export const generateID = (prefix?: string): string => {
	const timestamp = Date.now();

	return prefix ? `${prefix}_${timestamp}` : `${timestamp}`;
}

/**
 * Groups an array of records by a certain key.
 * @param {any[]} array
 * @param {string} keyId key to filter with 
 * @param {string} objectKey key for the object describing the key
 * @return {any[]} The result of grouping the array.
 */
export const groupByKey = (array: any[], keyId: string, keyTitle: string, objectKey?: string): any[] => {
	const groupedArray = [];

	array.forEach(item => {
		// check if the key already exists
		const keyGroup = groupedArray.find(groupItem => groupItem["id"] === item[keyId])

		if (keyGroup) { // if yes we add it to the items property
			keyGroup.items.push(item)
		} else { // if no, then we add the first item of this key group
			let obj: any = {
				id: item[keyId],
				title: item[keyTitle],
				items: [item]
			}

			if (objectKey) {
				obj = {
					...obj,
					[objectKey]: item[objectKey],
				}
			}

			groupedArray.push(obj)
		}
	});

	return groupedArray.sort((a, b) => a.id - b.id);
}