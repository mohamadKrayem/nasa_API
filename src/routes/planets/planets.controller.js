const {
  existsPlanet,
  getAllHabitablePlanets,
} = require("../../models/planets.model");

async function httpGetAllHabitablePlanets(req, res) {
  return res.status(200).json(await getAllHabitablePlanets());
}

async function httpGetPlanetByID(req, res) {
  const id = req.params.id;
  if (isNaN(Number(id))) {
    return res.status(400).json({
      error: "Id is not a number !!!",
    });
  }
  const planet = existsPlanet(id);
  if (planet) {
    return res.status(200).json(planet);
  }
  return res.status(400).json({
    error: "Planet not found !!!",
  });
}
module.exports = {
  httpGetAllHabitablePlanets,
  httpGetPlanetByID,
};
