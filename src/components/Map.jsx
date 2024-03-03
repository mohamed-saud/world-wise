import { useNavigate } from "react-router-dom";
import { icon } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import Button from "./Button";
import { useGeolocation } from "../hooks/useGeolocations";
import { useUrlPosition } from "../hooks/useUrlPosition";
function Map() {
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const { cities } = useCities();
  const { mapLat, mapLng } = useUrlPosition();
  const {
    getGeoLocationPosition,
    isLoading,
    positonGeolocation = mapPosition,
  } = useGeolocation();

  const navigate = useNavigate();
  const ICON = icon({
    iconUrl: "/marker.png",
    iconSize: [32, 32],
  });

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );
  useEffect(
    function () {
      if (positonGeolocation) setMapPosition(positonGeolocation);
    },
    [positonGeolocation]
  );
  return (
    <div className={styles.mapContainer}>
      {!positonGeolocation ? (
        <Button
          type="position"
          onclick={() => {
            navigate("form");
            getGeoLocationPosition();
          }}
        >
          {isLoading ? "Loading..." : "use your position"}
        </Button>
      ) : null}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker key={city.id} position={city.position} icon={ICON}>
            <Popup>
              <span>
                {city.emoji} {city.cityName}
              </span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenterMap position={mapPosition} />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}

function ChangeCenterMap({ position }) {
  const map = useMap();
  map.setView(position);
}
function LocationMarker() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
export default Map;
