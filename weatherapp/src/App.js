import React from "react";
import "./App.css";
import { APPID } from "./keys";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      weatherData: [],
      inputData: "",
      errors: ""
    };
    this.changeValue = this.changeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.findCoordinates = this.findCoordinates.bind(this);
  }
  changeValue(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=" +
        APPID
    );
  }
  findCoordinates() {
    function success(position) {
      console.log(position.coords.latitude, position.coords.longitude);
    }

    function error(error) {
      console.log(error);
    }
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <label>
            <h1>Search</h1>
            <br />
            <input
              type="text"
              name="inputData"
              placeholder="City"
              value={this.state.inputData}
              onChange={this.changeValue}
            />
          </label>
          <br />
          <input
            type="submit"
            value="Submit"
            disabled={!this.state.inputData}
          />
          <button
            type="button"
            className="btn btn-primary"
            name="findMe"
            onClick={this.findCoordinates}
          >
            Find Me
          </button>
        </form>
      </div>
    );
  }
}
export default App;
