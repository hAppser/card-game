import { AuthPage } from "./pages/auth/AuthPage";
import "../src/App.css";
const App = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <h1>Pokemon Card Game</h1>
    <AuthPage />
  </div>
);

export default App;
