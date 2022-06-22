module.exports = {

	development: {
		client: 'mysql',
		connection: {
			host: "127.0.0.1",
			port: 3306,
			user: "root",
			password: "^8@tzCERA!c3ib",
			database: "tasks-manager"
		},
		seeds: {
			directory: './src/db/seeds'
		}
	},
};
