"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _Product = _interopRequireDefault(require("./Product.js"));
var _Ingredient = _interopRequireDefault(require("./Ingredient.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var stockSchema = new _mongoose["default"].Schema({
  produto_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: _Product["default"]
  },
  ingrediente_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: _Ingredient["default"]
  },
  descricao: {
    type: String,
    required: true
  },
  quantidade: {
    type: Number,
    required: true
  },
  unidade_medida: {
    type: String,
    lowercase: true
  },
  valor: {
    type: String,
    required: true
  },
  ativo: {
    type: Number,
    required: true
  }
}, {
  versionKey: false
});
var Stock = _mongoose["default"].model('Stock', stockSchema, 'estoque');
var _default = exports["default"] = Stock;