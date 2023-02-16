const mongo = require("mongoose");

const planetSchema = new mongo.Schema({
  kepler_name: {
    type: String,
    required: true,
  },
});

module.exports = mongo.model("Planet", planetSchema);
