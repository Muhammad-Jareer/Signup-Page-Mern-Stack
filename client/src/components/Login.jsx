import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import { FacebookLoginButton, GoogleLoginButton,} from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: "auth-code",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        if (result.data.success) {
          navigate("/home");
        } else {
          setError(result.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary min-vh-100">
      <div
        className="bg-white p-4 rounded-lg shadow-sm"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
          <p className="mt-3 text-center">
            Dont have an Account?{" "}
            <Link to="/" className="text-decoration-none">
              Signup
            </Link>
          </p>
        </form>

        <div className="text-center mt-3">
          <GoogleLoginButton
            className="btn btn-danger btn-md"
            onClick={() => login()}
          >
            Login with Google
          </GoogleLoginButton>


    <LoginSocialFacebook
        appId="373123765723629"
        onResolve={(res) => {
          console.log(res);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
         <FacebookLoginButton>
          Login with Facebook
         </FacebookLoginButton>
      </LoginSocialFacebook>

        </div>
      </div>
    </div>
  );
};

export default Login;
