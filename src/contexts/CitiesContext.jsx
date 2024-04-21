import { createContext, useEffect, useContext, useReducer } from "react";

const BAS_URL = "http://localhost:8000";

const CitiesConstext = createContext();
const initial = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "citey/geted":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "cities/created":
      return { ...state, cities: action.payload, isLoading: false };
    case "cities/deleted":
      return { ...state, cities: action.payload, isLoading: false };
    case "error":
      return { ...state, error: action.payload };
    default:
      console.log("no casses");
  }
}
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initial
  );

  useEffect(function () {
    async function fetchCites() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BAS_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
        // setCities(() => data);
      } catch (error) {
        dispatch({ type: "error", payload: "can't fetch cities" });
      }
    }
    fetchCites();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;

    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BAS_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "citey/geted", payload: data });
    } catch (err) {
      throw new Error(err);
    }
  }
  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BAS_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "cities/created", payload: [...cities, data] });
    } catch (err) {
      throw new Error(err);
    }
  }
  async function deleteCitey(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BAS_URL}/cities/${id}`, { method: "DELETE" });
      dispatch({
        type: "cities/deleted",
        payload: cities.filter((city) => city.id != id),
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  return (
    <CitiesConstext.Provider
      value={{
        cities,
        dispatch,
        // setCities,
        isLoading,
        // setIsLoading,
        getCity,
        currentCity,
        createCity,
        deleteCitey,
      }}
    >
      {children}
    </CitiesConstext.Provider>
  );
}
/// consomer
function useCities() {
  const context = useContext(CitiesConstext);
  if (context === undefined)
    throw new Error("you use context out side the context provider");
  return context;
}
export { CitiesProvider, useCities };
