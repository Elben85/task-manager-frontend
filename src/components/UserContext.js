import { createContext, useEffect, useState } from "react";
import API from "../API/API";
import LoadingPage from "../pages/LoadingPage";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({
    isLoggedIn: false,
    userId: "",
    username: "",
    token: token === null ? "" : token
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    if (token === null) {
      setIsLoading(false);
      return;
    }
    const response = await API.post("/tokens/me", { token: token });
    if (Object.keys(response.data).length === 0) {
      setIsLoading(false);
      return;
    }
    setUser({
      isLoggedIn: true,
      userId: response.data.userId,
      username: response.data.username,
      token: token
    });
    setIsLoading(false);
  }, []);

  async function auth() {
    const response = await API.post("/tokens/auth", user);
    if (Object.keys(response.data).length === 0) {
      setUser({ isLoggedIn: false, userId: "", username: "", token: "" });
    }
  }

  if (user.isLoggedIn) {
    auth();
  }

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <UserContext.Provider
      value={{ userContext: user, setUserContext: setUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
