import "./style.css";
import { Card, ListGroup } from "react-bootstrap";

export const WeatherDetail = () => {
  return (
    <Card className="city-weather-card">
      <Card.Title>Weather Summary</Card.Title>

      <Card.Body className="card-body">
        <ListGroup className="list-group-flush">
          <ListGroup.Item>-City</ListGroup.Item>
          <ListGroup.Item>-Current temp</ListGroup.Item>
          <ListGroup.Item>
            -Icon for weather (sunny, cloudy and so on)
          </ListGroup.Item>
          <ListGroup.Item>-Forecast</ListGroup.Item>
          <ListGroup.Item>
            (Keeping this open-ended - use your imagination)
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
