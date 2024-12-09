import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useGetUser } from "@/entities/user/hooks/user.hooks";
import { AuthPage } from "@/pages/auth/AuthPage";
import { HomePage } from "@/pages/home/HomePage";
import { PokemonPage } from "@/pages/pokedex/PokemonPage";
import { MatchModePage } from "@/pages/match/MatchModePage";
import { NavigatableComponent } from "@/widgets/navigatableComponent/NavigatableComponent";
import { Presets } from "@/pages/presets/ui/Presets";
import { PresetBuilderPage } from "@/pages/presets/ui/PresetBuilderPage";
import { PresetSelectionPage } from "@/pages/presets/ui/PresetSelectionPage";
import { MatchPage } from "@/pages/match/MatchPage";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { data: user, isLoading } = useGetUser();

  if (isLoading) return;
  if (user === null) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {!user && <Route path="/login" element={<AuthPage />} />}
        {user && (
          <>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
              path="/home"
              element={<NavigatableComponent component={<HomePage />} />}
            />
            <Route
              path="/pokedex"
              element={<NavigatableComponent component={<PokemonPage />} />}
            />
            <Route
              path="/match"
              element={<NavigatableComponent component={<MatchModePage />} />}
            />
            <Route
              path="/match/start"
              element={<NavigatableComponent component={<MatchPage />} />}
            />
            <Route
              path="/presets"
              element={<NavigatableComponent component={<Presets />} />}
            />
            <Route
              path="/presets/new"
              element={
                <NavigatableComponent component={<PresetBuilderPage />} />
              }
            />
            <Route
              path="/preset-selection"
              element={
                <NavigatableComponent component={<PresetSelectionPage />} />
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
