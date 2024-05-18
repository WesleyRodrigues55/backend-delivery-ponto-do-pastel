"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _Ingredient = _interopRequireDefault(require("./Ingredient.js"));
var _Cart = _interopRequireDefault(require("./Cart.js"));
var _User = _interopRequireDefault(require("./User.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ingredientSchema = new _mongoose["default"].Schema({
  ingredient_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: _Ingredient["default"]
  },
  nome: {
    type: String,
    required: true
  }
});
var itemsCartSchema = new _mongoose["default"].Schema({
  carrinho_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: _Cart["default"]
  },
  produto_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: _User["default"]
  },
  lista_ingredientes: {
    type: [ingredientSchema],
    required: true
  },
  quantidade: {
    type: Number,
    required: true
  },
  preco_unitario: {
    type: String,
    required: true
  },
  preco_total: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});
var ItemsCart = _mongoose["default"].model('ItemsCart', itemsCartSchema, 'itens_carrinho');
var _default = exports["default"] = ItemsCart;