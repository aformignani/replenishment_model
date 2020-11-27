let knex = require('knex');
let dbConfig = {
	client: 'mysql',

	connection: {
		user: 'root',
		password: 'sa_miscusi_dwh',
		database: 'miscusi_dwh',
		host: '10.10.23.4',
		filename: '', // Only used for SQLite
		dateStrings: true
	}
};

// Need a bit of customisation for Oracle to use ISO date stamps
if ( dbConfig.client === 'oracledb') {
	dbConfig.fetchAsString = [ 'date', 'number', 'clob' ];
	dbConfig.pool = {
		afterCreate: function (conn, done) {
			conn.execute("ALTER SESSION SET NLS_DATE_FORMAT='YYYY-MM-DD HH24:MI:SS'", function (err) {
				if (err) {
					done(err, conn);
				}
				else {
					done(err, conn);
				}
			});
		}
	};
}

module.exports = knex(dbConfig);
