import User from "../models/User.js";
export async function getUser(req, res) {
  try {
    if (!req.session?.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(
      req.session.user.id,
      "walletAddress username"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateUsername(req, res) {
  const { username } = req.body;

  if (!req.session.user.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!username || typeof username !== "string") {
    return res.status(400).json({ error: "Invalid username" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.session.user.id,
      { username },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error updating username:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
