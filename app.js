const express = require("express");
const mysql = require("mysql");
const ejs = require("ejs");
const connectDB = require("./config/connectDB");
const { viewItems } = require("./controllers/itemsController");
const path = require("path");
const bodyParser = require("body-parser");

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
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

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

app.get("/edit/:id",(req,res)=>{
  const {id} = req.params;
  let sql = "SELECT * FROM items WHERE id =" + id;
  const query = connection.query(sql, id, (err, results) => {
    if (err) throw err;
    const {id, name, qty, amount} = results[0];
    res.render("edit",{
      title:"Edit "+ name + " item",
      id:id,
      name:name,
      qty:qty,
      amount:amount
    })
  });
});



app.post("/save", (req, res) => {
  const { nameInput, qtyInput, amtInput } = req.body;
  console.log(req.body);
  const data = {
    name: nameInput,
    qty: qtyInput,
    amount: amtInput,
  };
  let sql = "INSERT INTO items SET ?";
  const query = connection.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });

});


app.post("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { nameInput, qtyInput, amtInput } = req.body;
  const data = {
    name: nameInput,
    qty: qtyInput,
    amount: amtInput,
  };
  let sql = `UPDATE items SET ? WHERE id = ${id}`;
  const query = connection.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  let sql = `DELETE FROM items WHERE id = ${id}`;
  const query = connection.query(sql,id,(err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});





app.listen(3000, () => console.log("Server running on port 3000"));
