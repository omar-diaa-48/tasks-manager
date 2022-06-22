/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	return knex('status').del()
		.then(function () {
			// Inserts seed entries
			return knex('status').insert([
				{ id: 1, name: "To Do" },
				{ id: 2, name: "In Progress" },
				{ id: 3, name: "Blocked" },
				{ id: 4, name: "In QA" },
				{ id: 5, name: "Done" },
				{ id: 6, name: "Deployed" }
			]);
		});
};
