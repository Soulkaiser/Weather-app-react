import React from 'react';
import Titles from './components/Titles'
import Form from './components/Form'
import Weather from './components/Weather'

const API_KEY = "3782b9ba88d3527434d16acafae7031e"

export default class App extends React.Component{
    state = {
      temperature:undefined,
      city:undefined,
      country: undefined,
      humidity: undefined,
      description:undefined,
      error:undefined
    }
  getWeather = async (e) =>{
    e.preventDefault()
    const city = e.target.elements.city.value
    const country = e.target.elements.country.value
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
    const data = await api_call.json()
    console.log(data)
    if(city && country){
      this.setState({temperature: data.main.temp})
      this.setState({city: data.name})
      this.setState({country: data.sys.country})
      this.setState({humidity: data.main.humidity})
      this.setState({description: data.weather[0].description})
      this.setState({error: ""})
    }else{
      this.setState({temperature: undefined})
      this.setState({city: undefined})
      this.setState({country: undefined})
      this.setState({humidity: undefined})
      this.setState({description: undefined})
      this.setState({error: "Please enter the value"})
    }
  }
  render(){
    return(
    <div>
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-xs-5 title-container">
                <Titles />
              </div>
              <div className="col-xs-7 form-container">
                <Form getWeather={this.getWeather} />
                <Weather 
                  temperature={this.state.temperature} 
                  humidity={this.state.humidity}
                  city={this.state.city}
                  country={this.state.country}
                  description={this.state.description}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}