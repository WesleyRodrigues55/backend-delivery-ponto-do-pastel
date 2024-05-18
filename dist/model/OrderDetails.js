"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _Cart = _interopRequireDefault(require("./Cart.js"));
var _User = _interopRequireDefault(require("./User.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var listaPagamentoScheme = new _mongoose["default"].Schema({
  codigo_pagamento: {
    type: String,
    required: true
  },
  forma_pagamento: {
    type: String,
    required: true,
    lowercase: true
  },
  qrcode: {
    type: String,
    required: true
  },
  status_pagamento: {
    type: String,
    required: true,
    lowercase: true
  },
  link_pagamento: {
    type: String,
    required: true
  }
});
var oderDetailsSchema = new _mongoose["default"].Schema({
  carrinho_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: _Cart["default"]
  },
  usuario_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: _User["default"]
  },
  endereco_usuario_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true
  },
  valor: {
    type: String,
    required: true
  },
  taxa_entrega: {
    type: String,
    required: true
  },
  valor_total: {
    type: String,
    required: true
  },
  lista_pagamento: {
    type: [listaPagamentoScheme],
    required: true
  },
  data_pedido: {
    type: Date,
    required: true
  }
}, {
  versionKey: false
});
var OrderDetails = _mongoose["default"].model('OrderDetails', oderDetailsSchema, 'detalhes_do_pedido');
var _default = exports["default"] = OrderDetails;