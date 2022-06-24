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
				{ id: "S_1", name: "To Do" },
				{ id: "S_2", name: "In Progress" },
				{ id: "S_3", name: "Blocked" },
				{ id: "S_4", name: "In QA" },
				{ id: "S_5", name: "Done" },
				{ id: "S_6", name: "Deployed" }
			]);
		});
};
