const server = require("./src/app.js");
const { conn } = require("./src/db.js");

require("dotenv").config();

const { PORT } = process.env;

conn.sync({ alter: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
});
