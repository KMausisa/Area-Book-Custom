var express = require("express");
var path = require("path");
var http = require("http");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// import the routing file to handle the default (index) route
var index = require("./server/routes/app");

// establish connection to the mongo database
mongoose
  .connect("mongodb://localhost:27017/abc", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Connection failed: " + err);
  });

// routing files
const peopleRoutes = require("./server/routes/people");

var app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

app.use(logger("dev"));

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// root directory for your web site
app.use(express.static(path.join(__dirname, "dist/abc/browser")));

// Tell express to map the default route ('/') to the index route
app.use("/", index);

// mapping url's to routing files
app.use("/people", peopleRoutes);

// Tell express to map all other non-defined routes back to the index page
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/abc/browser/index.html"));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || "3000";
app.set("port", port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function () {
  console.log("API running on localhost: " + port);
});
