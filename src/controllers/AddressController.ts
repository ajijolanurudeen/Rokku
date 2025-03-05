import { Request, Response } from "express";
import db from "../database"; // Import Knex instance

// GET /addresses/:userID - Returns the address of a user
export const getAddress = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const address = await db("addresses").where({ user_id: userID }).first();

    if (!address) {
      return res.status(404).json({ error: "Address not found for this user" });
    }

    res.json(address);
  } catch (error) {
    res.status(500).json({ error: "Error fetching address" });
  }
};

// POST /addresses - Creates an address for a user
export const createAddress = async (req: Request, res: Response) => {
  try {
    const { user_id, street, city, state, zip } = req.body;

    // Ensure user does not already have an address
    const existingAddress = await db("addresses").where({ user_id }).first();
    if (existingAddress) {
      return res.status(400).json({ error: "User already has an address" });
    }

    const [id] = await db("addresses").insert({ user_id, street, city, state, zip });

    res.status(201).json({ id, user_id, street, city, state, zip });
  } catch (error) {
    res.status(500).json({ error: "Error creating address" });
  }
};

// PATCH /addresses/:userID - Updates an existing address for a user
export const updateAddress = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { street, city, state, zip } = req.body;

    // Ensure address exists
    const address = await db("addresses").where({ user_id: userID }).first();
    if (!address) {
      return res.status(404).json({ error: "Address not found for this user" });
    }

    // Update address
    await db("addresses").where({ user_id: userID }).update({ street, city, state, zip });

    res.json({ message: "Address updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating address" });
  }
};
