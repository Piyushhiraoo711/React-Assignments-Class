import React, { useState, useEffect } from "react";
import { AppProvider } from "./contextAPI/AppContext";
import { getUser, saveUser } from "./utils/localStorage";

function App() {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  // const handleLogin = (username, password, isLogin) => {
  //   const userData = { username, password, isLogin };
  //   setUser(userData);
  //   setIsLogged(true);
  //   saveUser(userData);
  // };

  // const handleSignup = (username, password, isLogin) => {
  //   const userData = { username, password, isLogin };
  //   setUser(userData);
  //   setIsLogged(true);
  //   saveUser(userData);
  //   navigate("/");
  // };

  // const handleLogout = () => {
  //   console.log("logout");
  //   setUser(null);
  //   setIsLogged(false);
  //   const user = getUser();
  //   if (user) {
  //     const updatedUser = { ...user, isLogin: false };
  //     saveUser(updatedUser);
  //   }
  // };

  // const value = {
  //   user,
  //   isLogged,
  //   handleLogin,
  //   handleLogout,
  //   handleSignup,
  // };

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser && storedUser.isLogin) {
      setUser(JSON.stringify(storedUser));
      setIsLogged(true);
      // saveUser()
    } else {
      setUser(null);
      setIsLogged(false);
    }
  }, []);

  return <AppProvider />;
}

export default App;
