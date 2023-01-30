const http = require("http")
const app = require('./app');
const {loadPlanets} = require("./models/planets.model");

const server = http.createServer(app);
const PORT = Number(process.env.port) || 3000;

loadPlanets().then(()=>{
   server.listen(PORT, ((port)=>{
      console.log("we are listening, PORT=",port);
   }).bind(null, PORT))
})
