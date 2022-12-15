//Import routing
import { Link } from "react-router-dom";

//import hook
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Nav = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Barangay Cencus</h1>
        </Link>
        <nav>
          {user ? (
            <div className="logout">
              <button onClick={handleClick}>Log out</button>
            </div>
          ) : (
            <div className="auth">
              <Link to="/login">Login</Link>
              <span>|</span>
              <Link to="/register">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Nav;
