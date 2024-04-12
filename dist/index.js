"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
require("./loadEnvironment.js");
require("express-async-errors");
var _users = _interopRequireDefault(require("./routes/users.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PORT = process.env.PORT || 5050;
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());

// Load the /posts routes
app.use("/api", _users["default"]);

// Global error handling
app.use(function (err, _req, res, next) {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

// start the Express server
app.listen(PORT, function () {
  console.log("Server is running on port: ".concat(PORT));
});