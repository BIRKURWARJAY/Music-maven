import { createContext, useContext } from "react";

export const LoginContext = createContext({
  users: [
    {
      id: 1,
      userName: "",
      email: "",
      password: "",
      agreedToTC: false,
      loggedIn: false,
      loggedOut: true
      }
  ],
  addUser: (user) => { },
  isLoggedIn: () => { },
  isLoggedOut: () => {}
})

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = LoginContext.Provider;