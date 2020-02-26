import React, { Component } from "react";

class WeatherInfo extends Component {
  constructor(props) {
    super(props);
    this.firstLetters = this.firstLetters.bind(this);
  }

  firstLetters(str) {
    let splitStr = str.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  }
  render() {
    const weather = this.props.weatherData;
    const weatherDescription = this.firstLetters(
      weather.weather[0].description
    );
    return (
      <div className="card">
        <h3 className=" card-header display-4">
          {weather.name},{weather.sys.country}
        </h3>
        <div className="card-body">
          <h3>Temperature right now : {weather.main.temp}&#176;F</h3>
          <h3>Feels like: {weather.main.feels_like}&#176;F</h3>
          <h4>
            Min: {weather.main.temp_min}&#176;F Max: {weather.main.temp_max}
            &#176;F
          </h4>
          <h4>{weatherDescription}</h4>
          <h4> Wind Speed: {weather.wind.speed}mph</h4>
          <h5>
            Latitiude: {weather.coord.lat} Longitude: {weather.coord.lon}
          </h5>
        </div>
      </div>
    );
  }
}

export default WeatherInfo;
