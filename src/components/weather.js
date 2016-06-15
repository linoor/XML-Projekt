import React from 'react';

let apiKey = "1b8ccc12e5520e98f5f03b4cdcd4ac9f";

let SmallInfo = React.createClass({
   render() {
       let classes = `${this.props.class} push-right`;

       return (
               <button type="button" className="btn btn-default smallinfo">
                   <i className={classes}></i>
                   <span>{this.props.name}</span>
               </button>
       )
   }
});

let Weather = React.createClass({

  getInitialState() {
      return {
          data: null
      }
  },

  componentWillMount() {
  },

  render() {
      let unit = this.props.data.unit === 'celsius' ? 'C' : 'F';
      let humidity = `${this.props.data.main.humidity}%`;
      let pressure = `${this.props.data.main.pressure} hPa`;
      let sunriseTime = new Date(this.props.data.sys.sunrise * 1000).toTimeString();
      let sunrise = `${sunriseTime}`;
      let sunsetTime = new Date(this.props.data.sys.sunset * 1000).toTimeString();
      let sunset = `${sunsetTime}`;
      let clouds = this.props.data.weather[0].description;
      let windClass = `wi wi-towards-n`;
      let mainIcon = `icon wi wi-owm-${this.props.data.weather[0].id}`;

      return (
          <div className="text-center">
              <div className="row city">
                  <span>{this.props.data.name}</span>
              </div>
              <div className="row temp">
                      <i className={mainIcon}></i>
                  <span className="">{this.props.data.main.temp}</span>
                  <span className="">°{unit}</span>
              </div>
              <div className="row">
                  <div className="btn-group" role="group" aria-label="info about weather wind humidity etc.">
                      <SmallInfo name="Wind" class="wi wi-direction-up" />
                      <SmallInfo name={humidity} class="wi wi-humidity" />
                      <SmallInfo name={pressure} class="wi wi-barometer" />
                      <SmallInfo name={clouds} class="wi wi-cloud" />
                  </div>
                  <div className="btn-group" role="group" aria-label="info about weather wind humidity etc.">
                      <SmallInfo name={sunrise} class="wi wi-sunrise" />
                      <SmallInfo name={sunset} class="wi wi-sunset" />
                  </div>
              </div>
          </div>
      )
  }
});

let Jumbotron = React.createClass({
   render() {
       return (
           <div className="jumbotron text-center">
               <h1 className="display-3">Welcome to the weather dashboard!</h1>
               <p className="lead">Change some input fields to generate results</p>
           </div>
       )
   }
});

export default React.createClass({
  getInitialState() {
      return {
          data: {
              'name': ''
          }
      };
  },

  componentWillMount() {
      if (sessionStorage.getItem('data') === null) {
          navigator.geolocation.getCurrentPosition(geoposition => {
              this.setState({coords: geoposition.coords});
              let coords = geoposition.coords;
              let lat = Math.round(coords.latitude);
              let lon = Math.round(coords.longitude);
              let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}`;
              $.get(url, (results) => {
                 this.setState({data: results});
                 let data = JSON.stringify(results);
                 sessionStorage.setItem('data', data);
              });
          });
      } else {
        let data = $.parseJSON(sessionStorage.getItem('data'));
        this.setState({data: data});
      }
  },

  render() {
    let data = $.parseJSON(sessionStorage.getItem('data')) || this.state.data;
    return(
        <div>
            <Jumbotron />
            <Weather data={data} />
        </div>
    )
  }
});
