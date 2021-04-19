const mysql = require("mysql");

const connectDB = () =>{
  const connection = mysql.createConnection({
    host:"http://localhost/",
    user:"root",
    password:"",
    database:"crud",
  });
  connection.connect((error)=>{
    if(!error) console.log(error);
    else console.log("Database Connected")
  })
}

module.exports = connectDB;