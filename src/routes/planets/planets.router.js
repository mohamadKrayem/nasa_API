const express = require("express");
const planetsController = require("./planets.controller");

const router = express.Router();

router.get("/", planetsController.httpGetAllPlanets);
router.get("/:id", planetsController.httpGetPlanetByID);

module.exports = router