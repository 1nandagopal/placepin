import React, { useState } from "react";
import useHTTP from "../hooks/useHTTP";
import Form from "../components/Form";
import Input from "../components/Input";
import {
  emailValidators,
  passwordValidators,
  userNameValidators,
} from "../../utils/validators";

function Auth() {
  const [isSignUpMode, setSignUpMode] = useState(false);
  const { sendRequest, isLoading, error, clearError } = useHTTP();

  const handleSubmit = async ({ email, password, userName }) => {
    try {
      if (isSignUpMode) {
        const response = await sendRequest("/api/users/signup", "post", {
          email,
          password,
          userName,
        });

        // login(response.token, response.userId);
        navigate("/");
      } else {
        const response = await sendRequest("/api/users/login", "post", {
          email,
          password,
        });
        // login(response.token, response.userId);
        navigate("/");
      }
    } catch (err) {
      if (err) console.log(error);
    }
  };

  const toggleSignUpMode = () => {
    clearError();
    setSignUpMode((state) => !state);
  };

  return (
    <div className="flex items-center justify-center px-6 py-8 mx-auto h-screen">
      <div className="w-full rounded-lg border max-w-md bg-gray-800 border-gray-700">
        <div className="p-8 space-y-6 text-white">
          <h1 className="text-3xl font-bold">
            {isSignUpMode ? "Sign Up" : "Sign In"}
          </h1>
          <Form onSubmit={handleSubmit}>
            {isSignUpMode && (
              <Input
                name="userName"
                validators={userNameValidators}
                label="Username"
                placeholder="Provide a username"
              />
            )}
            <Input
              name="email"
              validators={emailValidators}
              label="Email"
              placeholder="user@providor.com"
            />
            <Input
              type="password"
              name="password"
              validators={passwordValidators}
              label="Password"
              placeholder="Must be atleast 8 characters"
            />
            <div className="text-red-400 text-sm w-full h-6">{error}</div>
            <button>Sign in</button>
          </Form>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            {isSignUpMode
              ? "Already have an account? "
              : "Don’t have an account yet? "}
            <button
              onClick={toggleSignUpMode}
              className="font-medium hover:underline text-primary-500"
            >
              {isSignUpMode ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
