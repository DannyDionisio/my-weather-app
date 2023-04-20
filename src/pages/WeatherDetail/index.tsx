import { useParams } from "react-router-dom";
import { CityWeatherCard } from "../../components/CityWeatherCard";
import "./style.css";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { CityWeather } from "../HomePage";

export const WeatherDetail = () => {
  let { id } = useParams();
  const [city, setCity] = useState<CityWeather>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then((res) => {
        setCity(res.data);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <Card className="city-weather-detail">
      <Card.Title>Weather Details</Card.Title>

      {isLoading ? (
        <Card className="city-weather-card">
          <Spinner animation="border" role="status" size="sm">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Card>
      ) : (
        <div>
          <CityWeatherCard
            weather={city.weather[0].main}
            name={city.name}
            temperature={city.main.temp}
            temperatureMin={city.main.temp_min}
            temperatureMax={city.main.temp_max}
            humidity={city.main.humidity}
          />

          <Card.Body className="card-body">
            <ListGroup className="list-group-flush">
              <ListGroup.Item>{city.name}</ListGroup.Item>
              <ListGroup.Item>{city.main.temp}</ListGroup.Item>
              <ListGroup.Item>
                -Icon for weather (sunny, cloudy and so on)
              </ListGroup.Item>
              <ListGroup.Item>-Forecast</ListGroup.Item>
              <ListGroup.Item>
                (Keeping this open-ended - use your imagination)
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </div>
      )}
    </Card>
  );
};
