
import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current_weather/current_weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { useState } from "react";

function App() {
  const [currentWeather,setcurrentWeather] = useState(null);
  const [forcast,setforcastWeather] = useState(null);



  const handleOnSearchChange = (searchData)=>{
    const [lat , lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forcastWeatherFetch = fetch (
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    
    Promise.all([currentWeatherFetch,forcastWeatherFetch])
    .then(async(response)=>{
      const weatherResponce = await response[0].json();
      const focustResponce = await response[1].json();

      setcurrentWeather({city:searchData.label, ...weatherResponce});
      setforcastWeather({city:searchData.label,...focustResponce})

    })
    .catch((err)=>console.log(err))
  }
  console.log(currentWeather);
  console.log(forcast)

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      <CurrentWeather/> 
    </div>
  );
}

export default App;
