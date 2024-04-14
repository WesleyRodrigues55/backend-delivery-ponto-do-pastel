import express from "express";
import cors from "cors";
import "./loadEnvironment.js";
import "express-async-errors";

import users from "./routes/users.js";
import stock from "./routes/stock.js";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

// Load the /posts routes
app.use("/api", users);
app.use("/api", stock);

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});