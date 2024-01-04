const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;
const dbConnString = process.env.CONNSTR;

const userRoute = require("./routes/userRoute"); 
const { errorHandler } = require("./middleware/handelErrosMiddleware");

app.use(userRoute)

app.get("/", (req, res) => {
  res.send("User Registeration...");
});

app.use(errorHandler)

async function main() {
  try {
    await mongoose.connect(dbConnString)
    app.listen(PORT, () => {
      console.log("Server is running in port", PORT);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
