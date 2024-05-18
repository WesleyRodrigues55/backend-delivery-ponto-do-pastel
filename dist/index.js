"use strict";

var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
require("express-async-errors");
require("./loadEnvironment.js");
require("./middlewares/auth.js");
require("./middlewares/requests.js");
var _auth2 = _interopRequireDefault(require("./routes/auth.js"));
var _cart = _interopRequireDefault(require("./routes/cart.js"));
var _ingredient = _interopRequireDefault(require("./routes/ingredient.js"));
var _itemsCart = _interopRequireDefault(require("./routes/itemsCart.js"));
var _orderDetails = _interopRequireDefault(require("./routes/orderDetails.js"));
var _product = _interopRequireDefault(require("./routes/product.js"));
var _stock = _interopRequireDefault(require("./routes/stock.js"));
var _users = _interopRequireDefault(require("./routes/users.js"));
var _statusStore = _interopRequireDefault(require("./routes/statusStore.js"));
var _orderDeliveryStatus = _interopRequireDefault(require("./routes/orderDeliveryStatus.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PORT = process.env.PORT || 3001;
var app = (0, _express["default"])();
// app.use(cors());

app.use((0, _cors["default"])({
  origin: '*',
  methods: ['GET', 'POST', 'PUT'],
  // Métodos permitidos
  allowedHeaders: ['*'],
  // Cabeçalhos permitidos na requisição
  exposedHeaders: ['*'],
  // Cabeçalhos expostos na resposta
  credentials: false // Habilita o uso de credenciais (como cookies)
}));
app.use(_express["default"].json());

// Load the /posts routes
app.use("/api/users", _users["default"]);
app.use("/api/auth", _auth2["default"]);
app.use("/api/stock", _stock["default"]);
app.use("/api/product", _product["default"]);
app.use("/api/order-datails", _orderDetails["default"]);
app.use("/api/items-cart", _itemsCart["default"]);
app.use("/api/ingredient", _ingredient["default"]);
app.use("/api/cart", _cart["default"]);
app.use("/api/store", _statusStore["default"]);
app.use("/api/order-delivery-status", _orderDeliveryStatus["default"]);

// Global error handling
app.use(function (err, _req, res, next) {
  res.status(500).send("Uh oh! An unexpected error occured: ".concat(err));
});

// start the Express server
app.listen(PORT, function () {
  console.log("Server is running on port: ".concat(PORT));
});