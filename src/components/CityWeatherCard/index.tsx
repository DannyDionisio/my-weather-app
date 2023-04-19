import "./style.css";
import { Card, ListGroup } from "react-bootstrap";

export interface WeatherCardProps {
  // image: string;
  name: string;
  temperature: number;
  temperatureMin: number;
  temperatureMax: number;
  humidity: number;
}

export const CityWeatherCard = (props: WeatherCardProps) => {
  return (
    <Card className="city-weather-card">
      <Card.Title>{props.name}</Card.Title>

      <Card.Body className="card-body">
        {/* <Card.Img variant="top" src={props.image} /> */}

        <ListGroup className="list-group-flush">
          <ListGroup.Item>{props.temperature}</ListGroup.Item>
          <ListGroup.Item>{props.temperatureMin}</ListGroup.Item>
          <ListGroup.Item>{props.temperatureMax}</ListGroup.Item>
          <ListGroup.Item>{props.humidity}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
