import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import "express-async-errors";

import users from "./routes/users.js";
import stock from "./routes/stock.js";
import product from "./routes/product.js";
import orderDetails from "./routes/orderDetails.js";
import itemsCart from "./routes/itemsCart.js";
import ingredient from "./routes/ingredient.js";
import cart from "./routes/cart.js";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

// Load the /posts routes
app.use("/api", users);
app.use("/api", stock);
app.use("/api", product);
app.use("/api", orderDetails);
app.use("/api", itemsCart);
app.use("/api", ingredient);
app.use("/api", cart);

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});