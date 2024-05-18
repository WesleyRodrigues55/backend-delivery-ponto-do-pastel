"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _Cart = _interopRequireDefault(require("./Cart.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var orderDeliveryStatuschema = new _mongoose["default"].Schema({
  carrinho_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: _Cart["default"],
    unique: true,
    required: true
  },
  status_pedido: {
    type: String,
    required: true
  },
  data_pedido: {
    type: Date,
    required: true
  },
  tempo_entrega: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});
var OrderDeliveryStatus = _mongoose["default"].model('OrderDeliveryStatus', orderDeliveryStatuschema, 'status_entrega_pedido');
var _default = exports["default"] = OrderDeliveryStatus;