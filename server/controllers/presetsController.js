import Preset from "../models/Preset.js";
export async function getPresetsForUser(req, res) {
  try {
    const { mode } = req.query;
    const filter = { userId: req.session.user.id };

    if (mode === "1") filter["pokemon.1"] = { $exists: false };
    if (mode === "3") filter["pokemon.2"] = { $exists: true };

    const presets = await Preset.find(filter);
    res.json(presets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch presets" });
  }
}

export async function createPreset(req, res) {
  const { name, pokemon } = req.body;
  if (!name || !pokemon || pokemon.length === 0) {
    return res.status(400).json({ message: "Invalid preset data" });
  }
  try {
    const preset = new Preset({
      userId: req.session.user.id,
      name,
      pokemon,
    });

    await preset.save();
    res.status(201).json(preset);
  } catch (error) {
    res.status(500).json({ message: "Failed to create preset" });
  }
}

export async function deletePreset(req, res) {
  try {
    const preset = await Preset.findOneAndDelete({
      _id: req.params.id,
      userId: req.session.user.id,
    });

    if (!preset) {
      return res.status(404).json({ message: "Preset not found" });
    }

    res.json({ message: "Preset deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete preset" });
  }
}
