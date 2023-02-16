const http = require("http");
const app = require("./app");
const { loadPlanets } = require("./models/planets.model");
const mongoConnect = require("./services/mongo");

const server = http.createServer(app);
const PORT = Number(process.env.port) || 3000;

mongoConnect()
  .then(() => {
    loadPlanets();
  })
  .then(() => {
    server.listen(
      PORT,
      ((port) => {
        console.log("We are listening, PORT=", port);
      }).bind(null, PORT)
    );
  });
