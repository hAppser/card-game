import mongoose from "mongoose";
const PokemonSchema = new mongoose.Schema({
  name: String,
  type: [String],
  hp: Number,
  attack: Number,
  defense: Number,
  speed: Number,
  description: String,
  images: {
    sprite: String,
    thumbnail: String,
    hires: String,
  },
});

PokemonSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Pokemon = mongoose.model("Pokemon", PokemonSchema);

export default Pokemon;
