import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    isLoggedIn: false,
    userId: "",
    username: "",
  });

  return (
    <UserContext.Provider
      value={{ userContext: user, setUserContext: setUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
