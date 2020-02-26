import React from "react";
import "./App.css";
import { APPID } from "./keys";
import WeatherInfo from "./WeatherInfo";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      weatherData: [],
      inputCity: "",
      inputState: "",
      inputZip: "",
      errors: "",
      loading: false
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
    this.setState({ loading: true });
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
        "&units=imperial&appid=" +
        APPID
    )
      .then(res => res.json())
      .then(data => {
        if (data.cod !== 200) {
          this.setState({
            errors: data.message,
            loading: false
          });
        } else {
          const newData = [...this.state.weatherData];
          newData.unshift(data);
          this.setState({
            errors: "",
            weatherData: newData,
            loading: false
          });
        }
      });
  }
  findCoordinates() {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      this.setState({ loading: true });
      navigator.geolocation.getCurrentPosition(position => {
        fetch(
          "https://api.openweathermap.org/data/2.5/weather?lat=" +
            position.coords.latitude +
            "&lon=" +
            position.coords.longitude +
            "&units=imperial&appid=" +
            APPID
        )
          .then(res => res.json())
          .then(data => {
            if (data.cod !== 200) {
              this.setState({
                errors: data.message,
                loading: false
              });
            } else {
              const newData = [...this.state.weatherData];
              newData.unshift(data);
              this.setState({
                errors: "",
                weatherData: newData,
                loading: false
              });
            }
          });
      });
    }
  }
  render() {
    const isButtonValid =
      this.state.inputCity || this.state.inputState || this.state.inputZip;
    const displayWeather = this.state.weatherData.map((weather, index) => (
      <div key={index}>
        <WeatherInfo weatherData={weather} />
        <br />
      </div>
    ));
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h1 className="display-2">Get the Weather</h1>
          <h4>By City and State(If located within the US)</h4>
          <div className="input-group .input-space">
            <div className="input-group-prepend">
              <span className="input-group-text">City and State</span>
            </div>
            <input
              type="text"
              aria-label="City"
              className="form-control"
              name="inputCity"
              placeholder="City"
              value={this.state.inputCity}
              onChange={this.changeValue}
            />
            <input
              type="text"
              aria-label="State"
              className="form-control"
              name="inputState"
              placeholder="State"
              value={this.state.inputState}
              onChange={this.changeValue}
            />
          </div>
          <h4>
            <br />
            Or
          </h4>
          <div className="input-group .input-space">
            <div className="input-group-prepend">
              <span className="input-group-text">Zipcode</span>
            </div>
            <div className="col-xs-2">
              <input
                type="text"
                aria-label="ZipCode"
                className="form-control"
                name="inputZip"
                placeholder="Zipcode"
                value={this.state.inputZip}
                onChange={this.changeValue}
              />
            </div>
          </div>
          <br />
          <p>*If both fields are filled, Zipcode will be used</p>
          <input
            className=" btn btn-primary btn-space shadow"
            type="submit"
            value="Submit"
            disabled={!isButtonValid}
          />
          <button
            type="button"
            className="btn btn-secondary btn-space shadow"
            name="findMe"
            onClick={this.findCoordinates}
          >
            Use My Location
          </button>
        </form>
        {this.state.loading && (
          <div className="container">
            <div className="row">
              <div>
                <h3>Loading </h3>
              </div>
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        )}
        {this.state.errors && (
          <div className="alert alert-danger">
            <h4>Error: {this.state.errors}</h4>
          </div>
        )}
        {displayWeather}
      </div>
    );
  }
}
export default App;
