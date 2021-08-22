const mongoose = require("mongoose");
const express = require("express");
const app = express();
const chatRoutes = require("./routes/chat");
const authRoutes = require("./routes/auth");
const userRoute = require("./routes/getUsers");
const PORT = process.env.PORT || 3002;
const cors = require("cors");
const server = require("http").createServer(app);
const User = require("./models/user");
const Chat = require("./models/chat");
const responseTime = require("response-time");
require("./startup/prod")(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3002",
  },
});

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use("/", chatRoutes);
app.use("/", authRoutes);
app.use("/", userRoute);

const dbUri = process.env.dbUri || "mongodb://localhost:27017/chat-app";

mongoose
  .connect(dbUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("successfully connected to mongodb"))
  .catch((err) => console.log("Mongodb connection Error: ", err));

const connection = mongoose.connection;

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", async (socket) => {
  socket.on("chat", (data) => {
    const allChats = Chat.find();
    socket.emit("response-chat-data", allChats);
  });
  socket.on("user", (data) => {
    const allUsers = Chat.find();
    socket.emit("response-user-data", allUsers);
  });
});

server.listen(PORT, () => console.log(`Server running on ${PORT} port...`));
