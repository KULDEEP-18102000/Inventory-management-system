const express = require("express");
const app = express();

const userRoutes = require("./routes/user");
const inventoryRoutes = require("./routes/inventory");

const cors = require("cors");

const BodyParser = require("body-parser");

const mongoose = require("mongoose");

app.use(cors());

const io = require("socket.io")(3001, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("added-inventory", (inventory) => {
    socket.broadcast.emit("receive-inventory", inventory);
  });
  socket.on("added-item", (item) => {
    socket.broadcast.emit("receive-item", item);
  });
  socket.on("updated-item", (item) => {
    socket.broadcast.emit("receive-updated-item", item);
  });
  socket.on("deleted-item", (item) => {
    socket.broadcast.emit("receive-deleted-item", item);
  });
});

app.use(BodyParser.json({ extended: false }));

app.use("/user", userRoutes);
app.use("/inventory", inventoryRoutes);

mongoose
  .connect("mongodb://0.0.0.0:27017/inventory_backend_db")
  .then((result) => {
    console.log("connected");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
