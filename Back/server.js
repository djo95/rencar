const express = require("express");
const ConnectDB = require("./Config/ConnectDB");
const carsRouter = require("./Routes/Cars");
const userRouter = require("./Routes/Users");
const reservationRouter = require("./Routes/Reservations");
const path = require("path");
require("dotenv").config();

const app = express();

const cors = require("cors");
app.use(cors());

const port = 5000;

app.use(express.json({ limit: "50mb" }));
app.use("/api/cars", carsRouter);
app.use("/api/user", userRouter);
app.use("/api/reservation", reservationRouter);

app.use("/api/uploads", require("./Routes/UploadRoute"));
app.use("/uploads", express.static(path.join(__dirname, "./images")));
ConnectDB().then(() => {
  app.listen(port, console.log("server is running on port ", port));
});
