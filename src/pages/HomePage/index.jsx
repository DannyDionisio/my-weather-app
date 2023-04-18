import "./style.css";
import { Header } from "../../components/Header";
import { Form, InputGroup } from "react-bootstrap";
import { CityWeatherCard } from "../../components/CityWeatherCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const [cityValue, setCityValue] = useState();
  const weatherData = [
    {
      id: "1",
      image: "holder.js/100px180?text=Image cap",
      title: "New York",
      city: "New York",
      temp: "82º",
      lowTemp: "78º",
      highTemp: "87º",
      humidity: "48%",
    },
    {
      id: "2",
      image: "holder.js/100px180?text=Image cap",
      title: "San Francisco",
      city: "San Francisco",
      temp: "73º",
      lowTemp: "73º",
      highTemp: "73º",
      humidity: "43%",
    },
    {
      id: "3",
      image: "holder.js/100px180?text=Image cap",
      title: "Austin",
      city: "Austin",
      temp: "84º",
      lowTemp: "82º",
      highTemp: "87º",
      humidity: "70%",
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
        {weatherData.map((card) => {
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
