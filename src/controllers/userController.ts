import { Request, Response } from "express";
import knex from "../database";

export const getUsers = async (req: Request, res: Response) => {
    try {
      // Get pagination parameters from query
      const pageNumber = parseInt(req.query.pageNumber as string) || 0;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
  
      // Fetch users with pagination
      const users = await knex("users")
        .select("*")
        .offset(pageNumber * pageSize)
        .limit(pageSize);
  
      res.json({ pageNumber, pageSize, users });
    } catch (error) {
      res.status(500).json({ error: "Error fetching users" });
    }
  };

export const getUserCount = async (req: Request, res: Response) => {
    try {
      const countResult = await knex("users").count("id as count").first();
      res.json({ totalUsers: countResult?.count || 0 });
    } catch (error) {
      res.status(500).json({ error: "Error fetching user count" });
    }
  };

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await knex("users").where({ id: req.params.id }).first();
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const [id] = await knex("users").insert({ name, email, password });
    res.status(201).json({ id, name, email });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};
