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
				{ id: 1, title: "To Do" },
				{ id: 2, title: "In Progress" },
				{ id: 3, title: "Blocked" },
				{ id: 4, title: "In QA" },
				{ id: 5, title: "Done" },
				{ id: 6, title: "Deployed" },
				{ id: 100, title: "Created" }
			]);
		});
};
