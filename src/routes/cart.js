import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import Cart from "../model/Cart.js";

const router = express.Router();


export default router;