import { Schema, model } from "mongoose";

const presetSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  pokemon: [
    {
      id: { type: String, required: true },
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
});

const Preset = model("Preset", presetSchema);

export default Preset;
