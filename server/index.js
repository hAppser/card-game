import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import dotenv from "dotenv";
import bodyParser from "body-parser";
import sessionMiddleware from "./middlewares/sessionMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import pokemonRoutes from "./routes/pokemonRoutes.js";
import presetsRoutes from "./routes/presetsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3077;

connectDB();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(bodyParser.json());

app.use(sessionMiddleware);

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/pokemons", pokemonRoutes);
app.use("/presets", presetsRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${3077}`)
);
