const {getAllPlanets, existsPlanet} = require("../../models/planets.model");

function httpGetAllPlanets(req, res) {
   return res.status(200).json(getAllPlanets());
}

function httpGetPlanetByID(req, res){
   const id = req.params.id;
   const planet = existsPlanet(id)
   if(planet) {
      return res.status(200).json(planet)
   }
   return res.status(400).json({
      error: "Planet not found !!!"
   })
}
module.exports = {
   httpGetAllPlanets,
   httpGetPlanetByID
}