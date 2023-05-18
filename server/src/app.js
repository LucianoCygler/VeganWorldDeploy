const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes/index.js");
const server = express();

server.use(express.json());
server.use(morgan("dev"));
const corsOptions = {
  origin: "https://vegan-world-deploy.vercel.app/",
};

server.use(cors(corsOptions));

server.use("/", router);

module.exports = server;
