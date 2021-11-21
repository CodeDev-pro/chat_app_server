const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const { connection } = require("./sockets/chat_socket");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

const url =
  "mongodb+srv://server:RYizupWO5jbBSmTu@cluster0.gcfmw.mongodb.net/Cluster0?retryWrites=true&w=majority";

app.use(cors());

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: url,
      collectionName: "sessions_store",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

connection(io);

app.get("/", (req, res) => {

    if(req.session.viewCount) {
        req.session.viewCount = req.session.viewCount + 1;
    } else {
        req.session.viewCount = 1;
    }

    res.json({ req: "hello", views: `${req.session.viewCount} times` });
});

const mongooseConnection = mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected Succesfully");

    server.listen(PORT, () => {
      console.log(`Server Listening from ${PORT}`);
    });
  })
  .catch((e) => console.log(e));
