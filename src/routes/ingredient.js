import express from "express";
import "../config/db.js";
import { ObjectId } from "mongodb";
import Ingredient from "../model/Ingredient.js";
import passport from 'passport';

const unauthorized = passport.authenticate('jwt', { session: false });

const router = express.Router();


export default router;