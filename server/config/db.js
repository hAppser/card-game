import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI, { dbName: "pokemons" });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
