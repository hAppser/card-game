import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema({
  player: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pokemon: [
      {
        name: { type: String, required: true },
        hp: { type: Number, required: true },
        attack: { type: Number, required: true },
        defense: { type: Number, required: true },
        speed: { type: Number, required: true },
        type: { type: [String], required: false },
        images: {
          sprite: String,
          thumbnail: String,
          hires: String,
        },
      },
    ],
  },
  bot: {
    pokemon: [
      {
        name: { type: String, required: true },
        hp: { type: Number, required: true },
        attack: { type: Number, required: true },
        defense: { type: Number, required: true },
        speed: { type: Number, required: true },
        type: { type: [String], required: false },
        images: {
          sprite: String,
          thumbnail: String,
          hires: String,
        },
      },
    ],
  },
  turn: { type: String, enum: ["player", "bot"], required: true },
  status: { type: String, enum: ["ongoing", "finished"], default: "ongoing" },
  damageType: { type: String, required: true, default: "simple" },
  winner: { type: String, enum: ["player", "bot"], required: false },
  createdAt: { type: Date, default: Date.now },
});

MatchSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Match = mongoose.model("Match", MatchSchema);

export default Match;
