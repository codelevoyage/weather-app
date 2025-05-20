# 🌦️ Weather App

A simple weather application built using **HTML**, **CSS**, and **JavaScript** that fetches real-time weather data using the **OpenWeatherMap API**. The app provides smart suggestions based on weather conditions, displays animated weather-themed GIFs, and uses text-to-speech to read out the weather.



## 🚀 Features

- ✅ Real-time weather data for any city
- ✅ Smart checklist suggestions (e.g., "Bring an umbrella!" if it’s raining)
- ✅ Animated weather GIFs for sunny, rainy, snowy, and default weather
- ✅ Text-to-speech weather announcements
- ✅ Responsive and clean UI

## 🛠️ Built With

- HTML5
- CSS3
- JavaScript (Vanilla)
- OpenWeatherMap API
- Web Speech API
- GIFs from GIPHY


## 🔧 How to Run the Project

1. **Clone or download** this repository.

2. Open the project folder in your code editor.

3. Replace `"YOUR_API_KEY"` in the JavaScript file with your **OpenWeatherMap API key**.  
   👉 Sign up for a free key at: [https://openweathermap.org/api](https://openweathermap.org/api)

4. Open `index.html` in your web browser.

Now Enter a city name to view the current weather.


## 🌐 API Used: OpenWeatherMap

**OpenWeatherMap** is a free and popular API that provides current weather data, forecasts, and historical weather data.

**Endpoint Used:**

By city name:
http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric

By latitude and longitude:
http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric


## 📸 Screenshot

![App Screenshot](/weatherApp.jpg)