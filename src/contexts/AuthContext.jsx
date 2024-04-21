import { createContext, useReducer } from "react";

const AuthContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const initialState = {
  user: null,
  isAuthantcated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthantcated: true };

    case "logout":
      return { ...state, user: null, isAuthantcated: false };

    default:
      throw new Error("unkow action ");
  }
}

function AuthContextProvider({ children }) {
  const [{ user, isAuthantcated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function logIn(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
      console.log("login sucsesfull");
    } else {
      console.log("filed to login");
    }
  }
  function logOut() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthantcated, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider, AuthContext };
