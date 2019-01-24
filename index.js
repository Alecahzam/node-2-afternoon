const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
require("dotenv").config();
const products_controller = require("./products_controller");

const app = express();
app.use(bodyParser.json());

const port = 3000;

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    dbInstance.create_table();
    app.set("db", dbInstance);
  })
  .catch(err => console.log("Error"));
  
app.post("/api/products", products_controller.create);
app.get("/api/products", products_controller.getAll);
app.get("/api/products:id", products_controller.getOne);
app.put("/api/products/:id", products_controller.update);
app.delete("/api/products/:id", products_controller.delete);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
