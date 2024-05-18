"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var statusStoreSchema = new _mongoose["default"].Schema({
  status: {
    type: Number,
    required: true
  }
}, {
  versionKey: false
});
var StatusStore = _mongoose["default"].model('StatusStore', statusStoreSchema, 'status_store');
var _default = exports["default"] = StatusStore;