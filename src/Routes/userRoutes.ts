import express from "express";
import { getUsers, getUserById, createUser,getUserCount } from "../controllers/userController";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.get("/count", getUserCount);

export default router;
