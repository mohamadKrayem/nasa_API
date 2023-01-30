const express = require("express")
const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

const app = express();

app.use(express.json());
app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);
app.get("/", (req, res) => {
   return res.status(200).json({
      message: "Hello world !!"
   })
})

module.exports = app;