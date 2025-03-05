import express from "express";
import {  getAddress, createAddress,updateAddress } from "../controllers/AddressController";

const router = express.Router();

router.get("/:id", getAddress);
router.post("/", createAddress);
router.get("/:id", updateAddress);

export default router;