import { ethers } from "ethers";
import User from "../models/User.js";

const generateNonce = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  const nonce = Math.floor(Math.random() * 1000000).toString();

  req.session.nonce = nonce;
  await req.session.save();

  res.json({ nonce });
};

const verifySignature = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  try {
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
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).json({ message: "Failed to log out" });
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  } else {
    res.status(200).json({ message: "Logged out successfully" });
  }
};

export { generateNonce, verifySignature, logout };
