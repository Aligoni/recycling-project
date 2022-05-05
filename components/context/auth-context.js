import React from "react";
import { useRouter } from "next/router";

const AuthContext = React.createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = React.useState("");

  const setUserAuthInfo = (data) => {
    const token = localStorage.setItem("token", JSON.stringify(data));
    setAuthState(token);
  };

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      return false;
    }
    return true;
  };

  const logout = () => {
    console.log("logout ");
    setAuthState("");
    localStorage.removeItem("token");
    return true;
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: setUserAuthInfo,
        isUserAuthenticated,
        logout: logout,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
