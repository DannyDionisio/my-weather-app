import { FaCloud, FaCloudMeatball, FaCloudRain, FaSun } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./style.css";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import { useAppDispatch } from "../../redux/hooks";
import { deleteCity } from "../../features/weather/weatherSlice";
import { convertCelsiusToFahrenheit } from "../../utils";

export interface WeatherCardProps {
  lat?: number;
  lon?: number;
  id: number;
  weather: string;
  loading?: boolean;
  name: string;
  temperature: number;
  temperatureMin: number;
  temperatureMax: number;
  humidity: number;
  isFahrenheit?: boolean;
}

const weatherIcon = {
  Clouds: <FaCloud size={50} />,
  Clear: <FaSun size={50} />,
  Rain: <FaCloudRain size={50} />,
  Snow: <FaCloudMeatball size={50} />,
};

export const CityWeatherCard = (props: WeatherCardProps) => {
  const dispatch = useAppDispatch();

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteCity(props.id));
  };

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
            {props.isFahrenheit
              ? convertCelsiusToFahrenheit(props.temperature).toFixed(0) + " ºF"
              : props.temperature.toFixed(0) + " ºC"}
          </ListGroup.Item>
          {weatherIcon[props.weather]}
        </ListGroup>

        <ListGroup variant="flush">
          <MdDelete
            onClick={handleDelete}
            size={20}
            style={{ position: "relative", bottom: "15px", left: "90px" }}
          />
          <ListGroup.Item>
            Low:{" "}
            {props.isFahrenheit
              ? convertCelsiusToFahrenheit(props.temperatureMin).toFixed(0) +
                " ºF"
              : props.temperatureMin.toFixed(0) + " ºC"}
          </ListGroup.Item>
          <ListGroup.Item>
            High:{" "}
            {props.isFahrenheit
              ? convertCelsiusToFahrenheit(props.temperatureMax).toFixed(0) +
                " ºF"
              : props.temperatureMax.toFixed(0) + " ºC"}
          </ListGroup.Item>
          <ListGroup.Item>
            Humidity: {props.humidity.toFixed(0) + " %"}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
