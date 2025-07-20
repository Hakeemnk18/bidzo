import express from "express";
import { userLogin } from "../controllers/auth.controller";

const router = express.Router();


router.post("/login", userLogin);

export default router;
