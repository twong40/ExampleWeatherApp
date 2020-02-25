import React from "react";
import "./App.css";
import { APPID } from "./keys";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      weatherData: {},
      inputCity: "",
      inputState: "",
      inputZip: "",
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
    let params = "";
    if (this.state.inputZip) {
      params = "zip=" + this.state.inputZip;
    } else {
      if (this.state.inputCity && this.state.inputState) {
        params = "q=" + this.state.inputCity + "," + this.state.inputState;
      } else if (this.state.inputCity) {
        params = "q=" + this.state.inputCity;
      } else if (this.state.inputState) {
        params = "q=" + this.state.inputState;
      }
    }
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?" +
        params +
        "&appid=" +
        APPID
    )
      .then(res => res.json())
      .then(data => {
        if (data.cod != 200) {
          this.setState({
            errors: data.message
          });
        } else {
          this.setState({
            errors: ""
          });
        }
        this.setState({ weatherData: data });
      });
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
    const isButtonValid =
      this.state.inputCity || this.state.inputState || this.state.inputZip;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h1>Search</h1>
          <label>
            <br />
            <input
              type="text"
              name="inputCity"
              placeholder="City"
              value={this.state.inputCity}
              onChange={this.changeValue}
            />
          </label>
          <br />
          <label>
            <br />
            <input
              type="text"
              name="inputState"
              placeholder="State"
              value={this.state.inputState}
              onChange={this.changeValue}
            />
          </label>
          <br />
          <label>
            <br />
            <input
              type="text"
              name="inputZip"
              placeholder="Zipcode"
              value={this.state.inputZip}
              onChange={this.changeValue}
            />
          </label>
          <br />
          <input type="submit" value="Submit" disabled={!isButtonValid} />
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
