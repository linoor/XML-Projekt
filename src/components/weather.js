import React from 'react';

let apiKey = "1b8ccc12e5520e98f5f03b4cdcd4ac9f";


export default React.createClass({
  getInitialState() {
      return {
          data: {
              name: ``,
              main: {
                  humidity: 0,
                  pressure: 0
              },
              sys: {
                  sunrise: 0,
                  sunset: 0
              },
              weather: [{
                  description: ``,
                  id: 800
              }],
              wind: {
                  speed: 0,
                  deg: 90
              }
          },
          coData: {
              data: [{
                  value: 0
              }]
          },
          //o3Data: {}
      };
  },

  componentWillMount() {
      document.body.style.backgroundColor = 'rgb(0, 152,178)';
      if (sessionStorage.getItem(`data`) === null) {
          navigator.geolocation.getCurrentPosition(geoposition => {
              this.setState({coords: geoposition.coords});
              let coords = geoposition.coords;
              let lat = Math.round(coords.latitude);
              let lon = Math.round(coords.longitude);
              let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}&units=metric`;
              $.get(url, (results) => {
                 this.setState({data: results});
                 let data = JSON.stringify(results);
                 sessionStorage.setItem(`data`, data);
              });
          });
      } else {
        let data = $.parseJSON(sessionStorage.getItem(`data`));
        this.setState({data: data});
      }

      if (sessionStorage.getItem('coData') === null) {
          navigator.geolocation.getCurrentPosition(geoposition => {
              let coords = geoposition.coords;
              let lat = coords.latitude.toFixed(0);
              let lon = coords.longitude.toFixed(0);
              let date = 'current';
              let url = `http://api.openweathermap.org/pollution/v1/co/${lat},${lon}/${date}.json?appid=${apiKey}`;
              $.get(url, results => {
                  this.setState({coData: results});
                  let data = JSON.stringify(results);
                  sessionStorage.setItem('coData', data);
              })
          })
      } else {
          let data = $.parseJSON(sessionStorage.getItem(`coData`));
          this.setState({coData: data});
      }

      //if (sessionStorage.getItem('o3Data') === null) {
      //    navigator.geolocation.getCurrentPosition(geoposition => {
      //        let coords = geoposition.coords;
      //        let lat = coords.latitude.toFixed(0);
      //        let lon = coords.longitude.toFixed(0);
      //        let date = 'current';
      //        let url = `http://api.openweathermap.org/pollution/v1/o3/${lat},${lon}/${date}.json?appid=${apiKey}`;
      //        $.get(url, results => {
      //            this.setState({o3Data: results});
      //            let data = JSON.stringify(results);
      //            sessionStorage.setItem('o3Data', data);
      //        })
      //    })
      //} else {
      //    let data = $.parseJSON(sessionStorage.getItem(`o3Data`));
      //    this.setState({o3Data: data});
      //}
  },

  componentWillUnmount() {
      document.body.style.backgroundColor = '';
  },

  render() {
    let data = $.parseJSON(sessionStorage.getItem(`data`)) || this.state.data;
    let coData = sessionStorage.getItem('coData') !== null ? $.parseJSON(sessionStorage.getItem('coData')) : this.state.coData;
    return(
        <div>
            <Jumbotron />
            <Weather data={data} coData={coData} />
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

let Weather = React.createClass({

    getInitialState() {
        return {
            data: null,
            unit: 'celsius'
        }
    },

    updateUnit(unit) {
        let newUnit = unit === 'F' ? 'celsius' : 'fahrenheit';
        this.setState({unit: newUnit})
    },

    render() {
        let humidity = `${this.props.data.main.humidity}%`;
        let pressure = `${this.props.data.main.pressure} hPa`;
        let sunriseTime = new Date(this.props.data.sys.sunrise * 1000).toTimeString();
        let sunrise = `${sunriseTime}`;
        let sunsetTime = new Date(this.props.data.sys.sunset * 1000).toTimeString();
        let sunset = `${sunsetTime}`;
        let description = this.props.data.weather[0].description;

        let degrees = Math.round(this.props.data.wind.deg);
        let windDirection = `wi wi-wind`;
        let windSpeed = this.props.data.wind.speed;
        let windInfo = `${degrees}° ${windSpeed} km/h`;

        let mainIcon = `icon wi wi-owm-${this.props.data.weather[0].id}`;

        let coName = `Carbon dioxide (CO2) VMR ${this.props.coData.data[0].value}`;

        return (
            <div className="text-center">
                <div className="row city">
                    <p>{this.props.data.name}</p>
                </div>
                <div className="row temp">
                    <i className={mainIcon}></i>
                    <TempInfo temp={this.props.data.main.temp} unit={this.state.unit} updateUnit={this.updateUnit}/>
                    <p>{description}</p>
                </div>
                <div className="row" id="buttons">
                    <div className="btn-group" role="group" aria-label="info about weather wind humidity etc.">
                        <SmallInfo name={windInfo} class={windDirection} degrees={degrees} />
                        <SmallInfo name={humidity} class="wi wi-humidity" />
                        <SmallInfo name={pressure} class="wi wi-barometer" />
                    </div>
                    <div className="btn-group" role="group" aria-label="info about weather wind humidity etc.">
                        <SmallInfo name={sunrise} class="wi wi-sunrise" />
                        <SmallInfo name={sunset} class="wi wi-sunset" />
                    </div>
                    <div className="btn-group" role="group" aria-label="info about weather wind humidity etc.">
                        <SmallInfo name={coName} class="wi wi-volcano" />
                    </div>
                    <div className="btn-group" role="group" aria-label="info about weather wind humidity etc.">
                        <SmallInfo name={coName} class="wi wi-volcaon" />
                    </div>
                </div>
            </div>
        )
    }
});

function getWindStyles (degrees) {
    return {
        WebkitTransform: `rotate(${degrees})`,
        MozTransform: `rotate(${degrees}deg)`,
        MsTransform: `rotate(${degrees}deg)`,
        OTransform: `rotate(${degrees}deg)`,
        transform: `rotate(${degrees}deg)`
    };
}

let TempInfo = React.createClass({
    handleClick () {
        console.log(this.refs.unit.textContent);
       this.props.updateUnit(this.refs.unit.textContent);
    },

    render() {
        let unit = this.props.unit === 'fahrenheit' ? 'F' : 'C';
        let celsiusToFahrenheit = (f) => { return (f * 9/5 + 32); };
        let temp = unit === 'C' ?
            this.props.temp :
            Math.round(celsiusToFahrenheit(this.props.temp) * 100) / 100;
        return (
           <span onDoubleClick={this.handleClick}>
               <span>{temp}°</span>
               <span ref="unit">{unit}</span>
           </span>
        )
    }
})

let SmallInfo = React.createClass({
    render() {
        let classes = `${this.props.class} push-right`;
        let degreesStyle = this.props.degrees !== null ? getWindStyles(this.props.degrees) : {};

        return (
            <button type="button" className="btn btn-default smallinfo">
                <i className={classes} style={degreesStyle}></i>
                <span>{this.props.name}</span>
            </button>
        )
    }
});
