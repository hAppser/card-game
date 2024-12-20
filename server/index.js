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
import matchesRoutes from "./routes/matchRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.set("trust proxy", 1);

app.use(sessionMiddleware);

app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/pokemons", pokemonRoutes);
app.use("/presets", presetsRoutes);
app.use("/matches", matchesRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
