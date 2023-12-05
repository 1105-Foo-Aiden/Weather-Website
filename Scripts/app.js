import { apiKey } from "./environment.js";

let searchBar = document.getElementById("searchBar");
let location = document.getElementById("location");
let favorites = document.getElementById("favorties");
let searchBtn = document.getElementById("searchBtn");
let date = document.getElementById("date");
let currentTemp = document.getElementById("currentTemp");
let weatherCondition = document.getElementById("weatherCondition");
let highLow = document.getElementById("hi/lo");
let weatherStat = document.getElementById("weatherStat");
let longitude;
let latitude;
let day = new Date();

//Forcast Day 1
let day1Day = document.getElementById("day1Day");
let day1Status = document.getElementById("day1Status");
let day1HiLow = document.getElementById("day1HighLow");

//forcast Day 2
let day2Day = document.getElementById("day2Day");
let day2Status = document.getElementById("day2Status");
let day2HiLow = document.getElementById("day2HighLow");

//forcast Day 3
let day3Day = document.getElementById("day3Day");
let day3Status = document.getElementById("day3Status");
let day3HiLow = document.getElementById("day3HighLow");

//forcast Day 4
let day4Day = document.getElementById("day4Day");
let day4Status = document.getElementById("day4Status");
let day4HiLow = document.getElementById("day4HighLow");

//forcast Day 5
let day5Day = document.getElementById("day5Day");
let day5Status = document.getElementById("day5Status");
let day5HiLow = document.getElementById("day5HighLow");

day = day.toLocaleDateString("default", {
  weekday: `long`,
  day: "numeric",
  month: "long",
});

navigator.geolocation.getCurrentPosition(success, errorFunc);

async function success(position) {
    if(searchBar.value)
    {
        const search = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchBar.value}&limit=1&appid=${apiKey}`);
        const cityName = await search.json()
        latitude = cityName.lat;
        longitude = cityName.lon;
        console.log(latitude)
    }
    else
    {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude; 
    }

  const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial&cnt=40`);

  const data = await promise.json();

  currentTemp.textContent = `${Math.floor(data.list[0].main.temp)}\u00B0`;
  location.textContent = `${data.city.name}`;
  weatherCondition.textContent = `${data.list[0].weather[0].main}`;
  highLow.textContent = `\uFFEA ${Math.floor(data.list[0].main.temp_max)}\u00B0 \uFFEC ${Math.floor(data.list[0].main.temp_min)}\u00B0`;
  weatherStat.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
  for (let i = 0; i < data.list.length; i++) {
    let dayTime = new Date(data.list[i].dt * 1000);
    dayTime = dayTime.toLocaleString();
    console.log(dayTime);
    
  }
  date.textContent = `${day}`;

}

function errorFunc(error) {
  console.log(error.message);
}

searchBtn.addEventListener('keypress', function(e){
    searchBar.value = position;
    success(position)
    alert()
});