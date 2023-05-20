import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("loggedIn");
    const adminLogin = localStorage.getItem("adminLoggedIn");
    const user = localStorage.getItem("user");
    if (data) {
      setLoggedIn(JSON.parse(data));
    }
    if (adminLogin) {
      setLoggedIn(JSON.parse(adminLogin));
    }
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  //   const login = (user) => {
  //     setLoggedIn(true);
  //     setUser(user);

  //     localStorage.setItem("loggedIn", true);
  //     localStorage.setItem("user", JSON.stringify(user));
  //   };

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        user,
        setUser,
        adminLoggedIn,
        setAdminLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
