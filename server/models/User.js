import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  walletAddress: { type: String, required: true, unique: true },
  username: { type: String, required: false },
  nonce: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const User = model("User", UserSchema);

export default User;
