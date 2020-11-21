import React, { useContext } from "react";
import { useHistory, withRouter } from "react-router";
import { AuthContext } from "../contexts/Auth";

const SignIn = () => {
  const history = useHistory();
  const { signin } = useContext(AuthContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    signin(email.value, password.value, history);
  };

  return (
    <div>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default withRouter(SignIn);
