var sql = require('mssql'); 
var dbConfig = {
    user: 'sa',
    password: '123456',
    server: 'localhost',
    database: 'Chronograph',
    port: 1434,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options:{
        encrypt: false
    }
  };
function SqlOperation(sqls) {
    return new Promise((resolve,reject)=>{
        var conn = new sql.ConnectionPool(dbConfig);
        var req = new sql.Request(conn);
        conn.connect(function (err) {
            if (err) {
                resolve(err)
            }
            req.query(sqls, function (err, data) {
                conn.close();
                resolve(data)
            });
        });
    })
}
   module.exports=SqlOperation;