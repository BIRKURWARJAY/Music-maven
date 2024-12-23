import { createContext, useContext } from "react";

export const LoginContext = createContext({
  users: [
      {
      userName: "",
      email: "",
      password: "",
      agreedToTC: false
      }
  ],
  addUser: (user) => {}
})

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = LoginContext.Provider;