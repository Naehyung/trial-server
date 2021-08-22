import express from "express";
import { getAllUsers, signin, signup,updateUser } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/getAllUsers", getAllUsers);
router.post("/updateUser", updateUser)

export default router;
