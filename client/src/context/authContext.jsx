import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const init = {
  token: null,
  userId: null,
  // expiresIn: null,
  isLoggedIn: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        token: action.token,
        userId: action.userId,
        // expiresIn: action.expiresIn,
        isLoggedIn: true,
      };
    case "LOGOUT":
      return init;
    default:
      return init;
  }
}

export function AuthProvider(props) {
  const [state, dispatch] = useReducer(reducer, init);
  const login = (
    token,
    userId,
    expiresIn = new Date(new Date().getTime() + 1000 * 60 * 60 * 6)
  ) => {
    dispatch({ type: "LOGIN", token, userId });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
