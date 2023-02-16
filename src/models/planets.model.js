const fs = require("fs");
const planetsMongo = require("./planets.mongo");
const path = require("path");
const csv = require("csv-parse");

const parse = csv.parse;

function isHabitable(planet) {
    return (
        planet["koi_disposition"] == "CONFIRMED" &&
        planet["koi_insol"] > 0.36 &&
        planet["koi_insol"] < 1.11 &&
        planet["koi_prad"] < 1.6
    );
}

async function getAllHabitablePlanets() {
    return await planetsMongo.find(
        {},
        {
            __v: 0,
            _id: 0,
        }
    );
}

async function savePlanet(data) {
    try {
        await planetsMongo.updateOne(
            {
                kepler_name: data.kepler_name,
            },
            {
                kepler_name: data.kepler_name,
            },
            {
                upsert: true,
            }
        );
    } catch (err) {
        console.log(err);
    }
    /*.catch((err) => {
                      console.log(err);
                  });*/
}

function loadPlanets() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(
            path.join(__dirname, "..", "..", "data", "kepler_data.csv")
        )
            .pipe(
                parse({
                    columns: true,
                    comment: "#",
                })
            )
            .on("data", async (data) => {
                if (isHabitable(data)) {
                    await savePlanet(data);
                }
            })
            .on("error", (err) => {
                reject(err);
            })
            .on("end", () => {
                resolve();
            });
    });
}

async function existsPlanet(planetID) {
    const planet = await planetsMongo.findOne({ flightNumber: planetID });
    if (!planet) {
        return false;
    }
    return planet;
}

async function existsPlanetByName(planetName) {
    const planet = await planetsMongo.findOne({
        kepler_name: planetName,
    });

    if (!planet) {
        return false;
    }
    return true;
}

module.exports = {
    loadPlanets,
    getAllHabitablePlanets,
    existsPlanet,
    existsPlanetByName,
};
