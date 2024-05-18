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
  console.log("Conexão feita com sucesso!");
} catch (e) {
  console.log("Erro ao conectar ao banco de dados", error);
  console.error(e);
}
var db = conn.db(process.env.DATABASE);
var _default = exports["default"] = db;