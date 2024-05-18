"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var conn;
try {
  conn = _mongoose["default"].connect(process.env.ATLAS_URI || "");
  console.log("Conexão feita com sucesso!");
} catch (error) {
  console.log("Erro ao conectar ao banco de dados", error);
  console.error(e);
}
var _default = exports["default"] = conn;