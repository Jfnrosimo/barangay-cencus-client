//Import routing
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//Import pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

//Import components
import Nav from "./components/Nav";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <Nav />
      <div className="pages">
        <Routes>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
