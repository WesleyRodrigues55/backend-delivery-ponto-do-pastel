import cors from "cors";
import express from "express";
import "express-async-errors";
import "./loadEnvironment.js";
import './middlewares/auth.js';
import './middlewares/requests.js';

import auth from "./routes/auth.js";
import cart from "./routes/cart.js";
import ingredient from "./routes/ingredient.js";
import itemsCart from "./routes/itemsCart.js";
import orderDetails from "./routes/orderDetails.js";
import product from "./routes/product.js";
import stock from "./routes/stock.js";
import users from "./routes/users.js";
import statusStore from "./routes/statusStore.js";
import orderDeliveryStatus from "./routes/orderDeliveryStatus.js";

const PORT = process.env.PORT || 3001;
const app = express();
// app.use(cors());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT'], // Métodos permitidos
    allowedHeaders: ['*'], // Cabeçalhos permitidos na requisição
    exposedHeaders: ['*'], // Cabeçalhos expostos na resposta
    credentials: false // Habilita o uso de credenciais (como cookies)
}));

app.use(express.json());

// Load the /posts routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/stock", stock);
app.use("/api/product", product);
app.use("/api/order-details", orderDetails);
app.use("/api/items-cart", itemsCart);
app.use("/api/ingredient", ingredient);
app.use("/api/cart", cart);
app.use("/api/store", statusStore);
app.use("/api/order-delivery-status", orderDeliveryStatus);

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send(`Uh oh! An unexpected error occured: ${err}`)
})

// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});