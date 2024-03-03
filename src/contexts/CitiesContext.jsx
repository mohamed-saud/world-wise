import { createContext, useState, useEffect, useContext } from "react";

const BAS_URL = "http://localhost:8000";

const CitiesConstext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCites() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BAS_URL}/cities`);
        const data = await res.json();
        setCities(() => data);
      } catch (error) {
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCites();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BAS_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      throw new Error(err);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <CitiesConstext.Provider
      value={{
        cities,
        setCities,
        isLoading,
        setIsLoading,
        getCity,
        currentCity,
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
