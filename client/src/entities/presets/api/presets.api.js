import { apiClient } from "@/shared/api/apiClient";

export const fetchPresets = async () => {
  const { data } = await apiClient.get("/presets");
  return data;
};

export const createPreset = async (preset) => {
  const { data } = await apiClient.post("/presets", preset);
  return data;
};

export const deletePreset = async (presetId) => {
  await apiClient.delete(`/presets/${presetId}`);
};

export const fetchPresetsByMode = async (mode) => {
  const { data } = await apiClient
    .get(`/presets?mode=${mode}`)
    .then((res) => res);
  return data;
};
