import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from 'react-spinners/ClipLoader';
import {Container} from 'react-bootstrap';

// 날씨앱 만들기 순서
// 1. 앱이 실행되자마자 현재 위치 기반의 날씨가 보인다.
// 2. 날씨 정보에는 도씨, 섭씨, 화씨, 날씨상태를 알려준다.
// 3. 5개의 버튼이 있다.(1 : 현재위치, 4 : 다른도시)
// 4. 도시 버튼을 클릭할때마다 도시별 날씨가 나온다.
// 5. 현재 위치 기반 날씨버튼을 클릭하면 다시 현재 위치 기반으로 돌아온다.
// 6. 데이터를 가져오는 동안 로딩 스피너가 돌아간다.
function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState('');
  // array로 한 이유 : 반복되기 때문에 코드를 간결하게 하기 위해서
  const cities = ['Paris', 'New York', 'Tokyo', 'Seoul'];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    const apiKey = '7665b4cb2c93d66bfb9285654d0d9742';
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      setLoading(true);
      let response = await fetch(url); // 비동기
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    const apiKey = '7665b4cb2c93d66bfb9285654d0d9742';
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const handleCityChange = (city) => {
    if (city === 'current') {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  useEffect(() => {
    if (city == null) {
      setLoading(true);
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <>
      <Container className="vh-100">
        {loading ? (
          <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
            <ClipLoader color="#f86c6b" size={150} loading={loading} />
          </div>
        ) : !apiError ? (
          <div className="main-container">
            <WeatherBox weather={weather} />
            <WeatherButton
              cities={cities}
              handleCityChange={handleCityChange}
              selectedCity={city}
            />
          </div>
        ) : (
          apiError
        )}
      </Container>
    </>
  );
}

export default App;
