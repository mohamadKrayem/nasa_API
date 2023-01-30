const fs = require("fs")
const path = require("path")
const csv = require("csv-parse");

const parse = csv.parse;
const habitalePlanets= new Map();
const planets = new Map();

function isHabitable(planet){
    return(
      (planet['koi_disposition'] == 'CONFIRMED')
      &&  (planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11)
      &&  (planet['koi_prad']<1.6)
    ) 
}

function getAllHabitablePlanets(){
   return Array.from(habitalePlanets.values());
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
            habitalePlanets.set(data["kepid"], data)
         }
         const planet = {
            kepid: data['kepid'],
            kepler_name: data['kepler_name'],
            koi_disposition: data['koi_disposition'],
            koi_insol: data['koi_insol'],
            koi_prad: data['koi_prad']
         }
         planets.set(data["kepid"], planet);
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
   return habitalePlanets.get(planetID);
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
   getAllHabitablePlanets,
   existsPlanet,
   existsPlanetByName
}