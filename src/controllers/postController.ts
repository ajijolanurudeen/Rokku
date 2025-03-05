import { Request, Response } from "express";
import db from "../database";

// GET /posts?userId={userId} - Returns all posts for a user
export const getPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const posts = await db("posts").where({ user_id: userId }).select("*");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving posts" });
  }
};

// POST /posts - Creates a new post
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, body, userId } = req.body;

    // Validate input
    if (!title || !body || !userId) {
      return res.status(400).json({ error: "Title, body, and userId are required" });
    }

    // Check if user exists
    const userExists = await db("users").where({ id: userId }).first();
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const [id] = await db("posts").insert({ title, body, user_id: userId });

    res.status(201).json({ id, title, body, userId });
  } catch (error) {
    res.status(500).json({ error: "Error creating post" });
  }
};

// DELETE /posts/:id - Deletes a post by ID
export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await db("posts").where({ id }).del();

    if (!deleted) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting post" });
  }
};
