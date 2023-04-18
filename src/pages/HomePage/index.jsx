import "./style.css";
import { Header } from "../../components/Header";
import { Form, InputGroup } from "react-bootstrap";
import { CityWeatherCard } from "../../components/CityWeatherCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WeatherDetail } from "../WeatherDetail";

export const HomePage = () => {
  const navigate = useNavigate();
  const [cityValue, setCityValue] = useState();
  const weatherCards = [
    {
      id: "1",
      image: "holder.js/100px180?text=Image cap",
      title: "Weather Summary",
      city: "-City",
      temp: "-Current temp",
      lowTemp: "-Low temp",
      highTemp: "-High temp",
      humidity: "-Humidity",
    },
  ];

  const handleChange = (event) => {
    setCityValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("Value Submited.");
    }
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
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </InputGroup>
      </div>

      <div className="weather-cards-wrap">
        {weatherCards.map((card) => {
          return (
            <div
              key={card.id}
              onClick={() => {
                navigate(`/weatherDetail/${card.id}`);
              }}
            >
              <CityWeatherCard
                image={card.image}
                title={card.title}
                city={card.city}
                temp={card.temp}
                lowTemp={card.lowTemp}
                highTemp={card.highTemp}
                humidity={card.humidity}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
