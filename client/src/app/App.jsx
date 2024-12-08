import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useGetUser } from "@/entities/user/hooks/user.hooks";
import { AuthPage } from "@/pages/auth/AuthPage";
import { HomePage } from "@/pages/home/HomePage";
import { PokemonPage } from "@/pages/pokedex/PokemonPage";
import { BattleModePage } from "@/pages/battle/BattleModePage";
import { NavigatableComponent } from "@/widgets/navigatableComponent/NavigatableComponent";

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
              path="/battle"
              element={<NavigatableComponent component={<BattleModePage />} />}
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
