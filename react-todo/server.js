require("dotenv").config(); 
const express = require("express"); //for local server
const mongoose = require("mongoose"); //schema in mongodb
//routes
const authRoute = require("./routes/auth")

const app = express(); //starting server
app.use(express.json());
app.use(express.urlencoded());

app.get("/api", (req, res) => {
  res.send("Fullstack express server");
});
app.post("/name", (req, res) => {
  if (req.body.name) {
    return res.json({ name: req.body.name });
  } else {
    res.status(400).json({ error: "No name required" });
  }
});

app.use("/api/auth", authRoute)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to Database");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
