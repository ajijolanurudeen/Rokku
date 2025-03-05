import express from "express";
import { getPosts, createPost, deletePost } from "../controllers/postController";

const router = express.Router();

router.get("/", getPosts);  // Get posts for a user
router.post("/", createPost);  // Create a post
router.delete("/:id", deletePost);  // Delete a post by ID

export default router;
