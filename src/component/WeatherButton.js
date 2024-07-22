import React from 'react';
import {Button} from 'react-bootstrap';

const WeatherButton = ({cities, selectedCity, handleCityChange}) => {
  return (
    <div class="menu-container">
      <Button
        variant={`${selectedCity == null ? 'outline-light' : 'light'}`}
        onClick={() => handleCityChange('current')}
      >
        Current Location
      </Button>

      {cities.map((city) => (
        <Button
          variant={`${selectedCity == city ? 'outline-light' : 'light'}`}
          onClick={() => handleCityChange(city)}
        >
          {city}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
