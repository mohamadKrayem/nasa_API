const mongoose = require("mongoose");

const MONGODB_URL =
  "mongodb+srv://mohamadkrayem:v8hgQY4i5MW2RXFl@cluster0.w3nq5xd.mongodb.net/?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("Mongo is connected !!!");
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});

async function mongoConnect() {
  await mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = mongoConnect;
