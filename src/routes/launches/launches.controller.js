const launchesModel = require("../../models/launches.model");
const {existsPlanetByName} = require("../../models/planets.model");

function httpGetAllLaunches(req, res) {
   return res.status(200).json(launchesModel.getAllLaunches());
}

function httpPostLaunch(req, res) {
   const launch = req.body;
   if(!launch.customers || !launch.target || !launch.mission || !launch.rocket || !launch.launchDate) {
      return res.status(400).json({
         error: "Missing Property !!"
      })
   }

   const launchDate = new Date(launch.launchDate);
   if(isNaN(launchDate)) {
      return res.status(400).json({
         error: "Bad Date Format !!!"
      })
   }

   if(!existsPlanetByName(launch.target)) {
      return res.status(400).json({
         error: "Unreachable planet !!!"
      })
   }

   return res.status(401).json(launchesModel.addLaunch(launch));
}

function httpDeleteLaunch(req, res) {
   const launchID = req.params.id
   if(isNaN(Number(launchID))) {
      return res.status(400).json({
         error: "Id is not a number !!!"
      })
   }
   const deletedLaunch = launchesModel.removeLaunch(launchID);

   if(deletedLaunch){
      return res.status(200).json(deletedLaunch);
   }

   return res.status(400).json({
      error: "Launch isn't exist !!!"
   });
}

function httpGetHistoryLaunches(req, res) {
   return res.status(200).json(launchesModel.getHistoryLaunches())
}

module.exports = {
   httpGetAllLaunches,
   httpPostLaunch,
   httpDeleteLaunch,
   httpGetHistoryLaunches
}