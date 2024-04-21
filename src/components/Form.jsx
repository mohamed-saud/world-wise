// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoje] = useState("");
  const { mapLat, mapLng } = useUrlPosition();
  const [isLoading, setIsLoading] = useState(false);

  const { createCity } = useCities();

  useEffect(
    function () {
      if (!mapLat && !mapLat)
        return <Message>start by click some where</Message>;
      async function fetchCity() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
          );
          const data = await res.json();
          setCityName(data.countryName);
          setCountry(data.countryName);
          setEmoje(convertToEmoji(data.countryCode));
        } catch (err) {
        } finally {
          setIsLoading(false);
        }
      }
      //this function to fetch data
      fetchCity();
    },
    [mapLat, mapLng]
  );
  if (isLoading) return <Spinner />;
  function handelSubmetForm(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat: mapLat,
        lng: mapLng,
      },
    };
    createCity(newCity);
    navigate("/app/cities");
  }

  return (
    <form className={`${styles.form} ${isLoading ? styles.form.loading : ""}`}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(e) => setDate(e)}
          value={date}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button onclick={(e) => handelSubmetForm(e)} type="primary">
          Add
        </Button>
        <Button
          type="back"
          onclick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
