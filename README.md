Simple wrappers to the node oracle library integrated with a promise interface. It contains simple commands such as executing a statement and executing a query after connecting commiting and releasing. Viable with node version > 4.0.0.

Dependency:

https://github.com/oracle/node-oracledb

#### Installation

```
npm install node_oracle_wrappers
```

#### Example usage

```javascript

oracleWrappers = require('nodeOracleWrappers');

/*
Simple query execution
*/

let credentials = {
	user: "hello",
	password: "world",
	connectString: "localhost/XE"
};

let query = 'select * from base_table'



oracleWrappers.getData(credentials, query)
.then((results)=> {
	let rowsInObjectFormatt = results.rows;
	let metaData = results.metaData;
})


```