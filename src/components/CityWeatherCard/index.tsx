import { FaCloud, FaCloudMeatball, FaCloudRain, FaSun } from "react-icons/fa";
import "./style.css";
import { Card, ListGroup, Spinner } from "react-bootstrap";

export interface WeatherCardProps {
  weather: string;
  loading?: boolean;
  name: string;
  temperature: number;
  temperatureMin: number;
  temperatureMax: number;
  humidity: number;
}

const weatherIcon = {
  Clouds: <FaCloud size={50} />,
  Clear: <FaSun size={50} />,
  Rain: <FaCloudRain size={50} />,
  Snow: <FaCloudMeatball size={50} />,
};

export const CityWeatherCard = (props: WeatherCardProps) => {
  return props.loading ? (
    <Card className="city-weather-card">
      <Spinner animation="border" role="status" size="sm">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Card>
  ) : (
    <Card className="city-weather-card">
      <Card.Header>{props.name}</Card.Header>

      <Card.Body className="card-body">
        <ListGroup className="list-group-flush weather-temp">
          <ListGroup.Item>
            {props.temperature.toFixed(0) + " ºC"}
          </ListGroup.Item>
          {weatherIcon[props.weather]}
        </ListGroup>

        <ListGroup variant="flush">
          <ListGroup.Item>
            Low: {props.temperatureMin.toFixed(0) + " ºC"}
          </ListGroup.Item>
          <ListGroup.Item>
            High: {props.temperatureMax.toFixed(0) + " ºC"}
          </ListGroup.Item>
          <ListGroup.Item>
            Humidity: {props.humidity.toFixed(0) + " %"}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
