const express = require("express");
const mysql = require("mysql");
const ejs = require("ejs");
const connectDB = require("./config/connectDB");
const { viewItems } = require("./controllers/itemsController");
const path = require("path");

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory",
});
connection.connect((error) => {
  if (error) console.log(error);
  else console.log("Database Connected");
});

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  let sql = "SELECT * FROM items";
  let query = connection.query(sql, (err, rows) => {
    if (err) throw err;
    res.render("index", {
      title: "CRUD Inventory",
      items: rows,
    });
  });
});
app.get("/add", (req, res) => {
  res.render("add", {
    title: "Add an Item",
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
