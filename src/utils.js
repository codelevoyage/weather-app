    export const weatherGIFs = {
        sunny: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTF6d2llOXRxa3p4eDZ6bnc3eTBnbnF1dm55a2Nwc3VubDQxOXR6MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uqpK3SuxEY4W9YQvdg/giphy.gif",
        rain: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGswdjlleTdndWVwMGgwaW9pMGpzcTVlamgzZTZjaXhoaXFmY29wNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4NL5RJnYihpihzAhlX/giphy.gif",
        snow: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmlobGZkcXk2N25ndHJpaTUzNzZjaTVwYzAyczM2enN4Ym90cTVveSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JTghlLg0d1BpZvbQlG/giphy.gif",
        normal: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjFwb2E2ZmlnMjhreTBrMjBhOTlnMnBiMTk5ZmFmMGtraHc1c3dlbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9TyB06b4XSO8qgRmk4/giphy.gif",
        err: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGo4b29ybzVmaWhsaDVtbHhzc2d0NjZxZnZhcWVlajYzdm5uajM0bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dlMIwDQAxXn1K/giphy.gif"
    };

    export function getWeatherSuggestion(description, temp) { // Returns a weather-based suggestion string

        let suggestion = "";

        if (description.includes("rain")) {
          suggestion += "Bring an umbrella.<br>";
        } else if (description.includes("snow")) {
          suggestion += "Dress warmly, it's snowing.<br>";
        } else {

          if (temp < 10) {
            suggestion += "Stay warm.<br>";
          } else if (temp > 30) {
            suggestion += "Stay hydrated.<br>";
          } else if (temp >= 10 && temp <= 28) {
            suggestion += "Perfect day to be outside.<br>";
          }
        }
        return suggestion;
    }


    export function getWeatherGif(description) { // Picks a GIF URL based on weather description
        if (description.includes("rain")) {
          return weatherGIFs.rain;
        } else if (description.includes("snow")) {
          return weatherGIFs.snow;
        } else if (description.includes("clear")) {
          return weatherGIFs.sunny;
        } else {
          return weatherGIFs.normal;
        }
    }

    
    export function setGreeting(greetingP) { // Sets greeting based on time of day
    const hour = new Date().getHours();
    let greeting = "Hello";

    if (hour >= 5 && hour < 12) {
        greeting = "Good morning!";
    } else if (hour >= 12 && hour < 18) {
        greeting = "Good afternoon!";
    } else if (hour >= 18 && hour < 20) {
        greeting = "Good evening!";
    } else {
        greeting = "Good night!";
    }

    greetingP.textContent = greeting;
    
    }

    
    export function speakText(text) { // Uses Web Speech API to read text aloud
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
    }