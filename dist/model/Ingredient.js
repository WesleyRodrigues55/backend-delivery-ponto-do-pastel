"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ingredientSchema = new _mongoose["default"].Schema({
  nome: {
    type: String,
    required: true
  },
  valor: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true,
    lowercase: true
  },
  ativo: {
    type: Number,
    required: true
  }
}, {
  versionKey: false
});
var Ingredient = _mongoose["default"].model('Ingredient', ingredientSchema, 'ingrediente');
var _default = exports["default"] = Ingredient;