import { useState } from "react";
import { useNavigate } from "react-router-dom";
export function useGeolocation() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [positonGeolocation, setPositonGeolocation] = useState(null);
  const [isError, setIsError] = useState(false);
  function getGeoLocationPosition() {
    setIsLoading(true);

    if (!navigator.geolocation)
      return setIsError("your browser not suport location");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPositonGeolocation([pos.coords.latitude, pos.coords.longitude]);
        // navigate(`form?lat=${pos.coords.latitude}&lng=${pos.coords.latitude}`);
        setIsLoading(false);
      },
      (e) => setIsError("can not get your location")
    );
  }

  return { isLoading, positonGeolocation, getGeoLocationPosition, isError };
}
