import { useParams } from "react-router-dom";
import { CityWeatherCard } from "../../components/CityWeatherCard";
import "./style.css";
import { Card, Spinner, Table } from "react-bootstrap";
import { useEffect } from "react";
import {
  getCityDetail,
  getCityForecast,
} from "../../features/weather/weatherSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AnyAction } from "@reduxjs/toolkit";

export interface CityForecast {
  dt: number;
  dt_txt: string;
  weather: [
    {
      main: string;
    }
  ];
  main: {
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

function getDate(time: number) {
  const date = new Date(time * 1000);
  return date.toLocaleTimeString(`pt-PT`, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const WeatherDetail = () => {
  const dispatch = useAppDispatch();
  let { id } = useParams();
  const city = useAppSelector((state) => state.weather.city);
  const forecast = useAppSelector((state) => state.weather.forecast);
  const loading = useAppSelector((state) => state.weather.loading);

  useEffect(() => {
    dispatch(getCityDetail(id) as any as AnyAction);
  }, [id]);

  useEffect(() => {
    if (city?.coord) {
      dispatch(
        getCityForecast({
          ...city.coord,
        }) as any as AnyAction
      );
    }
  }, [city?.coord]);

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
            id={city.id}
            weather={city.weather[0].main}
            name={city.name}
            temperature={city.main.temp}
            temperatureMin={city.main.temp_min}
            temperatureMax={city.main.temp_max}
            humidity={city.main.humidity}
          />

          <Table striped bordered size="m" variant="light">
            <thead>
              <tr>
                <th>Time</th>
                <th>Event</th>
                <th>Humidity</th>
                <th>Wind</th>
              </tr>
            </thead>
            <tbody>
              {forecast.map((cityForecast) => {
                return (
                  <tr key={cityForecast.dt}>
                    <td>{getDate(cityForecast.dt)}</td>
                    <td>{cityForecast.weather[0].main}</td>
                    <td>{cityForecast.main.humidity}%</td>
                    <td>{cityForecast.wind.speed} km/h</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </Card>
  );
};
