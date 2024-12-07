import { ethers } from "ethers";
import User from "../models/User.js";

const generateNonce = async (req, res) => {
  const nonce = Math.floor(Math.random() * 1000000).toString();
  req.session.nonce = nonce;
  res.json({ nonce });
};

const verifySignature = async (req, res) => {
  const { walletAddress, signature } = req.body;
  const { nonce } = req.session;

  if (!nonce) return res.status(400).json({ error: "Nonce not found" });

  const msg = `Nonce: ${nonce}`;
  const recoveredAddress = ethers.verifyMessage(msg, signature);

  if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
    return res.status(401).json({ error: "Signature mismatch" });
  }

  let user = await User.findOne({ walletAddress }, "username, walletAddress");
  if (!user) {
    user = await User.create({ walletAddress, nonce });
  }

  req.session.user = user;
  res.json({ user });
};

export { generateNonce, verifySignature };
