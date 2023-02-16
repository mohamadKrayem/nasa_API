const launchesMongo = require("./launches.mongo");
const planetsMongo = require("./planets.mongo");

async function getAllLaunches() {
  return await launchesMongo.find(
    {
      upcomming: true,
      success: true,
    },
    {
      __v: 0,
      _id: 0,
    }
  );
}

async function getHistoryLaunches() {
  return await launchesMongo.find(
    {
      upcomming: false,
      success: false,
    },
    {
      __v: 0,
      _id: 0,
    }
  );
}

async function getLatestFlightNumber() {
  const latest = await launchesMongo.findOne().sort("-flightNumber");

  if (!latest) {
    return 100;
  }

  return latest.flightNumber;
}

async function addLaunch(launch) {
  const latestFlightNb = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    flightNumber: latestFlightNb,
    upcomming: true,
    success: true,
    customers: ["Nasa", "Space-X"],
  });

  await saveLaunch(newLaunch);
  return newLaunch;
}

async function saveLaunch(launch) {
  const planet = planetsMongo.findOne({
    kepler_name: launch.target,
  });

  if (!planet) {
    throw new Error(`No planet found with name ${launch.target}`);
  }

  await launchesMongo.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function removeLaunch(launchID) {
  const aborted = await launchesMongo.updateOne(
    {
      flightNumber: launchID,
    },
    {
      upcomming: false,
      success: false,
    }
  );

  return aborted.ok == 1 && aborted.nModified == 1;
}

module.exports = {
  getAllLaunches,
  addLaunch,
  removeLaunch,
  getHistoryLaunches,
};
