"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _User = _interopRequireDefault(require("./User.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var cartSchema = new _mongoose["default"].Schema({
  usuario_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: _User["default"]
  },
  status_compra: {
    type: String,
    required: true,
    lowercase: true
  },
  data_abertura: {
    type: Date,
    required: true
  },
  data_fechamento: {
    type: Date,
    required: true
  },
  valor_total: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});
var Cart = _mongoose["default"].model('Cart', cartSchema, 'carrinho');
var _default = exports["default"] = Cart;