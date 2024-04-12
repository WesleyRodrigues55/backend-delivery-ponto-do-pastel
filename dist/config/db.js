"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongodb = require("mongodb");
var connectionString = process.env.ATLAS_URI || "";
var client = new _mongodb.MongoClient(connectionString);
var conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}
var db = conn.db("ponto_do_pastel");
var _default = exports["default"] = db;