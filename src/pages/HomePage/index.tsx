import "./style.css";
import { Header } from "../../components/Header";
import { Form, InputGroup } from "react-bootstrap";
import { CityWeatherCard } from "../../components/CityWeatherCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CityWeather {
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
      icon: string;
    }
  ];
}

export const HomePage = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [weatherList, setWeatherList] = useState<CityWeather[]>([]);

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743&units;=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then((res) => {
        setWeatherList(res.data.list);
      });
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCity("");
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&units;=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        )
        .then((res) => {
          setWeatherList(weatherList.concat(res.data));
          console.log(res);
        });
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

      <div className="weather-cards-wrap">
        {weatherList.map((cityWeather) => {
          return (
            <div
              key={cityWeather.id}
              onClick={() => openWeatherDetail(cityWeather.id)}
            >
              <CityWeatherCard
                name={cityWeather.name}
                temperature={cityWeather.main.temp}
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