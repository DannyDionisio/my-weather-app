import "./style.css";
import { Header } from "../../components/Header";
import { Form, InputGroup } from "react-bootstrap";
import { CityWeatherCard } from "../../components/CityWeatherCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCities, getCity } from "../../features/weather/weatherSlice";
import { AnyAction } from "@reduxjs/toolkit";

export interface CityWeather {
  coord: {
    lat: number;
    lon: number;
  };
  id: number;
  name: string;
  main: {
    humidity: number;
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: [
    {
      main: string;
    }
  ];
}

export const HomePage = () => {
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const dispatch = useAppDispatch();
  const weatherList = useAppSelector((state) => state.weather.cities);
  const loading = useAppSelector((state) => state.weather.loading);

  const navigate = useNavigate();
  const [city, setCity] = useState("");

  const handleSwitch = (e) => {
    setIsFahrenheit(!isFahrenheit);
  };

  useEffect(() => {
    dispatch(getCities() as any as AnyAction);
  }, [dispatch]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      dispatch(getCity(city) as any as AnyAction);
      setCity("");
    }
  };

  const openWeatherDetail = (id: number) => {
    navigate("/weatherDetail/" + id);
  };

  return (
    <div>
      <div className="homePage-header">
        <Header />
        <InputGroup className="mb-3">
          <Form.Control
            aria-label="City"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Enter a City"
            onChange={(event) => setCity(event.target.value)}
            onKeyDown={handleKeyDown}
            value={city}
          />
        </InputGroup>
      </div>

      <Form>
        <Form.Check // prettier-ignore
          type="switch"
          id="custom-switch"
          label="Switch ºF to ºC"
          onClick={handleSwitch}
        />
      </Form>
      <div className="weather-cards-wrap">
        {weatherList.map((cityWeather) => {
          return (
            <div
              key={cityWeather.id}
              onClick={() => openWeatherDetail(cityWeather.id)}
            >
              <CityWeatherCard
                lat={cityWeather.coord.lat}
                lon={cityWeather.coord.lon}
                id={cityWeather.id}
                weather={cityWeather.weather[0].main}
                loading={loading}
                name={cityWeather.name}
                temperature={cityWeather.main.temp}
                isFahrenheit={isFahrenheit}
                temperatureMax={cityWeather.main.temp_max}
                temperatureMin={cityWeather.main.temp_min}
                humidity={cityWeather.main.humidity}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
