import React from 'react';

function WeatherBox({weather}) {
  console.log('weather : ', weather);
  return (
    <div className="weather-box">
      {/* weather에서 name을 가져옴 */}
      <div>{weather?.name}</div>
      <h2>
        {weather?.main.temp}C | {weather?.main.temp * 1.8 + 32}F
      </h2>
      <h3>{weather?.weather[0].description}</h3>
      <p>최고기온 : {weather?.main.temp_max}C</p>
      <p>체감기온 : {weather?.main.feels_like}C</p>
    </div>
  );
}

export default WeatherBox;
