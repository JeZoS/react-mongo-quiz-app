const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path")


const connect = () => {
  console.log("Connecting to DB");
  mongoose
  .connect(
    "mongodb+srv://JeZoS:password262111@hocus.rnrwrfc.mongodb.net/?retryWrites=true&w=majority",
    {
      dbName: "words",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    )
    .then((resp) => console.log("Connected Succesfully"))
    .catch((err) => console.log("error occured", err));
  };
  
connect();

const app = express();
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname,'/build')))

app.get("/", (req,res) => {
  console.log("/ path")

  res.sendFile(path.resolve(__dirname,'/build','index.html'));
})

// app.get("/", (req, resp) => {
//   resp.send("App is Working");
// });

app.get("/questions", async (req, resp) => {
  const level = req.query.level;
  const collection = mongoose.connection.collection("questions_with_levels");
  const response = await collection.find({ level: level }).toArray();
  resp.send({ questions: response });
});

app.listen(5000);
