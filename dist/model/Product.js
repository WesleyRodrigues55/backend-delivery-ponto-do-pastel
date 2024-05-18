"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var productSchema = new _mongoose["default"].Schema({
  nome: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  preco: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true,
    lowercase: true
  },
  imagem_produto: {
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
var Product = _mongoose["default"].model('Product', productSchema, 'produto');
var _default = exports["default"] = Product;