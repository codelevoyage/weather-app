
// Import functions and constants
import {weatherGIFs, getWeatherSuggestion, getWeatherGif, setGreeting, speakText} from "./utils.js";

// Weather API key from environment variable
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

document.addEventListener("DOMContentLoaded", () => {
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
    const city = input.value.trim();
    
    if (!city) return;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    fetchAndDisplay(url);
  })
  
  // Handle fetch using geolocation
  locationButton.addEventListener("click",()=>{
    
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






  // const weatherGIFs = {
  //   sunny: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTF6d2llOXRxa3p4eDZ6bnc3eTBnbnF1dm55a2Nwc3VubDQxOXR6MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uqpK3SuxEY4W9YQvdg/giphy.gif",
  //   rain: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGswdjlleTdndWVwMGgwaW9pMGpzcTVlamgzZTZjaXhoaXFmY29wNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4NL5RJnYihpihzAhlX/giphy.gif",
  //   snow: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmlobGZkcXk2N25ndHJpaTUzNzZjaTVwYzAyczM2enN4Ym90cTVveSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JTghlLg0d1BpZvbQlG/giphy.gif",
  //   normal: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjFwb2E2ZmlnMjhreTBrMjBhOTlnMnBiMTk5ZmFmMGtraHc1c3dlbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9TyB06b4XSO8qgRmk4/giphy.gif",
  //   err: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGo4b29ybzVmaWhsaDVtbHhzc2d0NjZxZnZhcWVlajYzdm5uajM0bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dlMIwDQAxXn1K/giphy.gif"
  // };


  // function getWeatherSuggestion(description, temp) {

  //   let suggestion = "";

  //   if (description.includes("rain")) {
  //     suggestion += "Bring an umbrella...<br>";
  //   } else if (description.includes("snow")) {
  //     suggestion += "Dress warmly, it's snowing...<br>";
  //   } else {

  //     if (temp < 10) {
  //       suggestion += "Stay warm...<br>";
  //     } else if (temp > 30) {
  //       suggestion += "Stay hydrated...<br>";
  //     } else if (temp >= 10 && temp <= 28) {
  //       suggestion += "Perfect day to be outside...<br>";
  //     }
  //   }
  //   return suggestion;
  // }


      // if (description.includes("rain")) {
      //   weatherAnimation.src = weatherGIFs.rain;
      // } else if (description.includes("snow")) {
      //   weatherAnimation.src = weatherGIFs.snow;
      // } else if (description.includes("clear")) {
      //   weatherAnimation.src = weatherGIFs.sunny;
      // } else {
      //   weatherAnimation.src = weatherGIFs.normal;
      // }

      // function getWeatherGif(description) {
      //   if (description.includes("rain")) {
      //     return weatherGIFs.rain;
      //   } else if (description.includes("snow")) {
      //     return weatherGIFs.snow;
      //   } else if (description.includes("clear")) {
      //     return weatherGIFs.sunny;
      //   } else {
      //     return weatherGIFs.normal;
      //   }
      // }


// function setGreeting() {
//   const hour = new Date().getHours();
//   let greeting = "Hello";

//   if (hour >= 5 && hour < 12) {
//     greeting = "Good morning 🌅";
//   } else if (hour >= 12 && hour < 18) {
//     greeting = "Good afternoon ☀️";
//   } else if (hour >= 18 && hour < 20) {
//     greeting = "Good evening 🌙";
//   } else {
//     greeting = "Good night 🌠";
//   }

//   greetingP.textContent = greeting;
// }


    // const utterance = new SpeechSynthesisUtterance(text);
    // utterance.lang = "en-US";
    // speechSynthesis.speak(utterance);


      // if (!data.city || !data.list || !data.list.length) {
      //   resultDiv.textContent = "No weather data available.";
      //   return;
      // }