import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import Product from "../model/Product.js";

const router = express.Router();


export default router;