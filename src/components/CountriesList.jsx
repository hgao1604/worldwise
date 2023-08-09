import styles from "./CountriesList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";
export default function CountriesList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return (
      <Message message="add your first city by clicking on a city on the map " />
    );

  const countries = cities.reduce((acc, city) => {
    if (!acc.map((el) => el.country).includes(city.country)) {
      return [...acc, { country: city.country, emoji: city.emoji }];
    } else {
      return acc;
    }
  }, []);
  return (
    <ul className={styles.countriesList}>
      {countries.map((country) => (
        <CountryItem country={country} />
      ))}
    </ul>
  );
}
