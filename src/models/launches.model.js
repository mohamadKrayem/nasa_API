const launches = new Map();
let latestLaunchID = 1;

const launch = {
   upcomming : true,
   success: true,
   launchID: 1,
   launchDate: new Date("January 17, 2030"),
   target: "Kepler-452 b",
   mission: "to Kepler-452 b",
   rocket: "US-NASA-452",
   customers: ["Nasa", "Space-X"]
}

launches.set(launch.launchID, launch)

function getAllLaunches() {
   return Array.from(launches.values()).filter((launch)=>{
      return launch.upcomming && launch.success;
   });
}

function getHistoryLaunches() {
   return Array.from(launches.values()).filter(launch=>(!launch.upcomming && !launch.success))
}

function addLaunch(launch) {
   latestLaunchID++;
   launch.upcomming = true;
   launch.success = true;
   launch.launchID = latestLaunchID;
   launches.set(latestLaunchID, launch)
   return launch;
}

function removeLaunch(launchID) {
   console.log(launchID)
   const launch = launches.get(Number(launchID));
   console.log(launch)
   if(launch) {
      launch['upcomming'] = false;
      launch["success"] = false;
   }
   return launch
}

module.exports = {
   getAllLaunches,
   addLaunch,
   removeLaunch,
   getHistoryLaunches
}