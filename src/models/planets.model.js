const fs = require("fs")
const path = require("path")
const csv = require("csv-parse");

const parse = csv.parse;
const planets = new Map();

function isHabitable(planet){
    return(
      (planet['koi_disposition'] == 'CONFIRMED')
      &&  (planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11)
      &&  (planet['koi_prad']<1.6)
    ) 
}

function getAllPlanets(){
   return Array.from(planets.values());
}

function loadPlanets() {
   return new Promise((resolve, reject) => {
      fs.createReadStream(path.join(__dirname, "..", "..", "data", "kepler_data.csv"))
      .pipe(parse({
         columns: true,
         comment: "#"
      })).on("data", (data) => {
         if(isHabitable(data)) {
            planets.set(data["kepid"], data)
         }
      })
      .on("error", (err) => {
         reject(err);
      })
      .on("end", () => {
         resolve();
      })
   })
}

function existsPlanet(planetID) {
   return planets.get(planetID);
}

function existsPlanetByName(planetName) {
   const arrayOfPlanets = getAllPlanets();
   for(let planet of arrayOfPlanets){
      if(planet["kepler_name"] == planetName){
         return true;
      }
   }

   return false
}

module.exports = {
   loadPlanets,
   getAllPlanets,
   existsPlanet,
   existsPlanetByName
}