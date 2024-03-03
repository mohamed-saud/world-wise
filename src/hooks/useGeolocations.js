import { useState } from "react";
export function useGeolocation() {
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
        setIsLoading(false);
      },
      (e) => setIsError("can not get your location")
    );
  }

  return { isLoading, positonGeolocation, getGeoLocationPosition, isError };
}
