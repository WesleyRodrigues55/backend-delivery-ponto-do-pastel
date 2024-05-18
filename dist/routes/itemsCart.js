"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
require("../config/db.js");
var _mongodb = require("mongodb");
var _ItemsCart = _interopRequireDefault(require("../model/ItemsCart.js"));
var _passport = _interopRequireDefault(require("passport"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var unauthorized = _passport["default"].authenticate('jwt', {
  session: false
});
var router = _express["default"].Router();
var _default = exports["default"] = router;