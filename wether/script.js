
"use strict";

document.getElementById("btn").addEventListener("click", function () {
  var city = document.getElementById("w-input").value.trim();
  var API_key = "8a787dbc42fb9162b0b5ab9231a040ef";

  if (!city) {
    document.getElementById("weatherInfo").innerHTML =
      "<p>Please enter a city name.</p>";
    return;
  }

  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`;

  fetch(url)
    .then((response) => {
      
      if (!response.ok) {
        throw new Error("City not found or request failed");
      }
      return response.json(); 
    })
    .then((data) => {
      console.log(data); 

      if (data && data.weather) {
        var temperature = data.main.temp;  
        var weatherDescription = data.weather[0].description;
        // var icon = data.weather[0].icon;
        var humidity = data.main.humidity;
        var windspeed = data.wind.speed;

       
        // icon = icon
        //   ? `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`
        //   : '<img src="default-icon.png" alt="Weather Icon">';
  // ${icon}
     
        document.getElementById("weatherInfo").innerHTML = `
          <h3>Weather in ${city}</h3>
        
          <p>Temperature: ${temperature}°C</p>
          <p>Description: ${weatherDescription}</p>
          <p>Humidity: ${humidity}%</p>
          <p>Wind Speed: ${windspeed} km/h</p>
        `;
      } else {
        document.getElementById("weatherInfo").innerHTML =
          "<p>Weather data not available for this city.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      document.getElementById("weatherInfo").innerHTML =
        "<p>Failed to fetch data. Please try again later.</p>";
    });
});
