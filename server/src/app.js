const express = require("express");
const morgan = require("morgan");
const router = require("./routes/index.js");
const server = express();

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(express.json());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://vegan-world-deploy.vercel.app/"
  ); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", router);

module.exports = server;
