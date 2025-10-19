import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

import config from '../config.js';
dotenv.config();

export const pool = mysql.createPool({
  host: config.db_host,
  user: config.db_user,
  password: config.db_password,
  database: config.db_database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true
});
pool.getConnection(function(err, connection) {
  // Do something with the connection
  if(err){
      console.log("error");
   }
   if(connection){
      // connection.release();
       pool.releaseConnection(connection);
       console.log("base de datos funcionando");
       return;
   }
//   conn.query(/* ... */);
  // Don't forget to release the connection when finished!
 // pool.releaseConnection(conn);
})

/*
const pool = createPool(database).then(() => {
  console.log("base de datos funcionando");
}); 


pool.getConnection((err,connection)=>{

if(err){
 console.log("error");
}
if(connection){
  connection.release();
  console.log("base de datos funcionando");
  return;
}
});*/


