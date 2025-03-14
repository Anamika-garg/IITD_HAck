const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./router/userRoutes");
const jobsRoutes = require("./router/jobsRoutes");
// const postRoutes = require("./router/postRoutes");
const TestRoute = require("./router/test.js");
// const DoubtRoute = require("./router/doubt.js");
const app = express();

app.use(express.json());

app.use(cors());

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use("/api/user", userRoutes);
app.use("/api/job", jobsRoutes);
// app.use("/api/post", postRoutes);
app.use("/api/test" , TestRoute)
// app.use("/api/doubt" , DoubtRoute)


app.get("/", (req, res) => {
  res.send("Hello,world");
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Database connected Successful!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Port listening on port 3000");
});
