
// Import functions and constants
import {weatherGIFs, getWeatherSuggestion, getWeatherGif, setGreeting, speakText} from "./utils.js";

// Weather API key from environment variable
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

document.addEventListener("DOMContentLoaded", () => {
   window.speechSynthesis.cancel();

  // Get DOM elements
  const input = document.getElementById("cityInput");
  const button = document.getElementById("getForecastBtn");
  const resultDiv = document.getElementById("weatherResult");
  const locationButton = document.getElementById("getLocationBtn");
  const greetingP = document.getElementById("greeting");
  const speakBtn = document.getElementById("speakBtn");
  const weatherAnimation = document.querySelector(".weather-animation img");

  // Handle fetch by city name
  button.addEventListener("click", async()=>{
    window.speechSynthesis.cancel();
    const city = input.value.trim();
    
    if (!city) return;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    fetchAndDisplay(url);
  })
  
  // Handle fetch using geolocation
  locationButton.addEventListener("click",()=>{
    window.speechSynthesis.cancel();
    if(!navigator.geolocation){
      resultDiv.textContent = "Geolocation is not supported by your browser.";
      return;
    }
    navigator.geolocation.getCurrentPosition(async(position) => {
      console.log(position);
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      fetchAndDisplay(url);      
    })

  })

  // Convert result text to speech
  speakBtn.addEventListener("click", () => {
    const text = resultDiv.textContent;
    if (!text) return;
    speakText(text);
  });

  // Fetch data from API and update the UI
  async function fetchAndDisplay(url) {
    resultDiv.textContent = "Loading...";
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        resultDiv.textContent = "City not found.";
        weatherAnimation.src = weatherGIFs.err;
        return;
      }

      const data = await response.json();
      console.log(data);


      const temp = data.list[0].main.temp;
      const description = data.list[0].weather[0].description;
      const city = data.city.name;

      // Set the appropriate weather animation
      const suggestion = getWeatherSuggestion(description, temp);

      resultDiv.innerHTML = `
        <h2>Weather in ${city}</h2>
        <p><strong>Temperature:</strong> ${temp} °C</p>
        <p><strong>Condition:</strong> ${description}</p>
        <p>${suggestion || "No suggestions."}</p>
        
      `;


      weatherAnimation.src = getWeatherGif(description);

    } catch (err) {
      resultDiv.textContent = "Failed to fetch weather data.";
      console.error(err);
    }
}

// Set greeting based on current time
setGreeting(greetingP);

})

