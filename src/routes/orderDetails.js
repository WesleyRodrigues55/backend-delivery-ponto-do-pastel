import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import OrderDetails from "../model/OrderDetails.js";

const router = express.Router();


export default router;