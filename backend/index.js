const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const PORT = process.env.PORT;
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

// Apply CORS middleware first
app.use(cors(corsOptions));

// Connect to the database
connectDB();

app.use(logger);

// app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use("/", require("./routes/root"));
app.use("/users", require("./routes/userRoutes"));
app.use("/notes", require("./routes/noteRoutes"));

app.use((req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// The error-handling middleware is placed last because it’s meant to catch and handle errors that occur in any of the preceding middleware or route handlers.
// When an error is passed to next(), Express skips all the middlewares that don’t have the error handling signature (i.e., four arguments).
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to the database!");
  app.listen(PORT, () => console.log(`Sever listening on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
