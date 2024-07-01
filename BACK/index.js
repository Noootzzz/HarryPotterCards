const express = require("express");
const routes = require("./routes/start");
const cors = require("cors");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const ip = require("ip");
const ipAddr = ip.address();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);

let lastHouseVisited = "";

app.get("/", (req, res) => {
  res.json({ message: lastHouseVisited });
});

app.post("/", (req, res) => {
  lastHouseVisited = req.body.house;
  console.log("Valeur reçue du client:", lastHouseVisited);
});

app.listen(port, () => {
  console.log(`Serveur running : http://${ipAddr}:3000`);
});
