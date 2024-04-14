import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import Ingredient from "../model/Ingredient.js";

const router = express.Router();


export default router;