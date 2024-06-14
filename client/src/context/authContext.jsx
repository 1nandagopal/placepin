import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const init = {
  token: null,
  userId: null,
  expiresIn: null,
  isLoggedIn: false,
};

let timer;

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        token: action.token,
        userId: action.userId,
        expiresIn: action.expiresIn,
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
    localStorage.setItem(
      "user",
      JSON.stringify({ token, userId, expiresIn: expiresIn.toISOString() })
    );
    dispatch({ type: "LOGIN", token, userId, expiresIn });
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token && new Date(user.expiresIn) > new Date()) {
      login(user.token, user.userId, new Date(user.expiresIn));
    } else {
      logout();
    }
  }, []);

  useEffect(() => {
    if (state.token) {
      timer = setTimeout(
        logout,
        state.expiresIn.getTime() - new Date().getTime()
      );
    } else {
      clearTimeout(timer);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [state]);

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
