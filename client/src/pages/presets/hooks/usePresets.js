import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPresets,
  createPreset,
  deletePreset,
  fetchPresetsByMode,
} from "../api/presets.api";

export const usePresets = () => {
  return useQuery({ queryFn: fetchPresets, queryKey: ["presets"] });
};

export const useCreatePreset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPreset,
    onSuccess: () => {
      queryClient.invalidateQueries(["presets"]);
    },
  });
};

export const useDeletePreset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePreset,
    onSuccess: () => {
      queryClient.invalidateQueries(["presets"]);
    },
  });
};

export const usePresetsByMode = (mode) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["presets", mode],
    queryFn: () => fetchPresetsByMode(mode),
  });

  return { data, isLoading, error };
};
