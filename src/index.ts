import express from "express";
import dotenv from "dotenv";
import userRoutes from "./Routes/userRoutes";
import addressRoutes from "./Routes/addressRoutes"
import postRoutes from "./Routes/postRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/addresses", addressRoutes);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
