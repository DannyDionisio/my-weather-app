import { useParams } from "react-router-dom";
import { CityWeatherCard } from "../../components/CityWeatherCard";
import "./style.css";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { getCityDetail } from "../../features/weather/weatherSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AnyAction } from "@reduxjs/toolkit";

export const WeatherDetail = () => {
  const dispatch = useAppDispatch();
  let { id } = useParams();
  const city = useAppSelector((state) => state.weather.city);
  const loading = useAppSelector((state) => state.weather.loading);

  useEffect(() => {
    dispatch(getCityDetail(id) as any as AnyAction);
  }, [id]);

  return (
    <Card className="city-weather-detail">
      <Card.Title>Weather Details</Card.Title>

      {loading || !city ? (
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
