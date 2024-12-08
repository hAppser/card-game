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
    },
  ],
});

const Preset = model("Preset", presetSchema);

export default Preset;
