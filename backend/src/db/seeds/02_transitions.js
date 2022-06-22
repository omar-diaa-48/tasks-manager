/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	return knex('transition').del()
		.then(function () {
			// Inserts seed entries
			return knex('transition').insert([
				{ from: 1, to: 2 },
				{ from: 2, to: 3 },
				{ from: 2, to: 4 },
				{ from: 3, to: 1 },
				{ from: 4, to: 1 },
				{ from: 4, to: 5 },
				{ from: 5, to: 6 }
			]);
		});
};
