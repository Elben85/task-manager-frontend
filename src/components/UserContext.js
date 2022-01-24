import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const currentUser = localStorage.getItem("user");
  const [user, setUser] = useState(
    currentUser === null
      ? {
          isLoggedIn: false,
          userId: "",
          username: ""
        }
      : JSON.parse(currentUser)
  );

  return (
    <UserContext.Provider
      value={{ userContext: user, setUserContext: setUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
