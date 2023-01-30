const express = require("express");
const launchesRouter = express.Router();
const launchesController = require("./launches.controller");

launchesRouter.get("/", launchesController.httpGetAllLaunches);
launchesRouter.post("/", launchesController.httpPostLaunch);
launchesRouter.delete("/:id", launchesController.httpDeleteLaunch);
launchesRouter.get("/history", launchesController.httpGetHistoryLaunches);

module.exports = launchesRouter