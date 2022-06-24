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
				{ from: "S_1", to: "S_2" },
				{ from: "S_2", to: "S_3" },
				{ from: "S_2", to: "S_4" },
				{ from: "S_3", to: "S_1" },
				{ from: "S_4", to: "S_1" },
				{ from: "S_4", to: "S_5" },
				{ from: "S_5", to: "S_6" }
			]);
		});
};
