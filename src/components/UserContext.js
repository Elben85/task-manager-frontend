import { createContext, useEffect, useState } from "react";
import LoadingPage from "../pages/Loading";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    isLoggedIn: false,
    userId: "",
    username: ""
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    if (currentUser === null) {
      return;
    }
    setUser(JSON.parse(currentUser));
    setIsLoading(false);
  });

  return (
    <UserContext.Provider
      value={{ userContext: user, setUserContext: setUser }}
    >
      {isLoading ? <LoadingPage /> : children}
    </UserContext.Provider>
  );
}
