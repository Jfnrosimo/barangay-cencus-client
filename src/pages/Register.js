import { useState } from "react";

//Import hook
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const { register, error } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(email, password, address);
    console.log(email, password);
    if (!error) {
      alert("Successfully registered!");
    }
  };

  return (
    <div className="form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>REGISTER</h2>

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Address:</label>
        <input
          type="text"
          value={address.toUpperCase()}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button>Sign up</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Register;
