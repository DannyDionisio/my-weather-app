import "./style.css";
import { Card, ListGroup } from "react-bootstrap";

export const CityWeatherCard = (props) => {
  return (
    <Card className="city-weather-card">
      <Card.Title>{props.title}</Card.Title>

      <Card.Body className="card-body">
        <Card.Img variant="top" src={props.image} />

        <ListGroup className="list-group-flush">
          <ListGroup.Item>{props.city}</ListGroup.Item>
          <ListGroup.Item>{props.temp}</ListGroup.Item>
          <ListGroup.Item>{props.lowTemp}</ListGroup.Item>
          <ListGroup.Item>{props.highTemp}</ListGroup.Item>
          <ListGroup.Item>{props.humidity}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
