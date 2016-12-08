
const Oracledb = require('oracledb');

let getConnection = function(connectionDetails) {
	return new Promise((resolve , reject)=> {
		Oracledb.getConnection(connectionDetails, function(err, connection) {
			if (err) {
				reject(err);
			} else {
				resolve(connection);
			}
		})
	});
};


let executeQuery = function(connection, params, query) {
	return new Promise((resolve , reject)=> {
		connection.execute(
			query,
			params,
			{outFormat: oracledb.OBJECT},
			(err, results) => {
				if (err) {
					console.error("Error during query execution.");
					reject(err);
				} else {
					resolve({
						connection: connection,
						results: results
					})
				}
			}
			)
	});
};


let commitConnection = function(connection, results) {
	return new Promise((resolve , reject)=> {
		connection.commit(function(err) {
			if (err) {
				reject(err);
			}

			if (results) {
				resolve(results)
			} else {
				resolve();
			}
		})
	})
}

let releaseConnection = function(connection, results) {
	return new Promise((resolve , reject)=> {
		connection.release(function(err) {
			if (err) {
				reject(err);
			}

			if (results) {
				resolve(results)
			} else {
				resolve();
			}
		})
	})
}

let getData = function(credentials, query, params) {
	return new Promise((resolve , reject) => {

		getConnection(credentials)
		.then((connection)=> {
			if (params) {
				return executeQuery(connection, params, query);
			} else {
				return executeQuery(connection, {}, query);
			}
		})
		.then((queryResults)=> {
			return releaseConnection(queryResults.connection, queryResults.results)
		})
		.then((results)=> {
			resolve(results);
		})
		.catch((err)=> {
			console.error("Error during get data " + err);
			reject(err);
		})

	});

}



module.exports.nodeOracleWrappers = {
	getData: getData,
	releaseConnection: releaseConnection,
	commitConnection: commitConnection,
	getConnection: getConnection
}