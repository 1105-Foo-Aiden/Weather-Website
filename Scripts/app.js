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
let compareDay = new Date()


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



day1Day.textContent = `${new Date(day.getTime() + 86400000).toLocaleDateString('en-US', {weekday: 'short'})} ${new Date(day.getTime() + 86400000).toLocaleDateString('en-US', {day:'numeric'})}`
day2Day.textContent = `${new Date(day.getTime() + 86400000 * 2).toLocaleDateString('en-US', {weekday: 'short'})} ${new Date(day.getTime() + 86400000 * 2).toLocaleDateString('en-US', {day:'numeric'})}`
day3Day.textContent = `${new Date(day.getTime() + 86400000 * 3).toLocaleDateString('en-US', {weekday: 'short'})} ${new Date(day.getTime() + 86400000 * 3).toLocaleDateString('en-US', {day:'numeric'})}`
day4Day.textContent = `${new Date(day.getTime() + 86400000 * 4).toLocaleDateString('en-US', {weekday: 'short'})} ${new Date(day.getTime() + 86400000 * 4).toLocaleDateString('en-US', {day:'numeric'})}`
day5Day.textContent = `${new Date(day.getTime() + 86400000 * 5).toLocaleDateString('en-US', {weekday: 'short'})} ${new Date(day.getTime() + 86400000 * 5).toLocaleDateString('en-US', {day:'numeric'})}`

day = day.toLocaleDateString("default", { weekday: `long`, day: "numeric",  month: "short",});

navigator.geolocation.getCurrentPosition(success, errorFunc);

async function success(position) {
  //Max Arrays

  let day1MaxArr = []
  let day2MaxArr = []
  let day3MaxArr = []
  let day4MaxArr = []
  let day5MaxArr = []


  //Min Arrays
  let day1MinArr = []
  let day2MinArr = []
  let day3MinArr = []
  let day4MinArr = []
  let day5MinArr = [] 

  if(searchBar.value)
    {
      const search = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchBar.value}&limit=1&appid=${apiKey}`);
      const cityName = await search.json()
      console.log(cityName[0].lat)
      latitude = cityName[0].lat;
      longitude = cityName[0].lon;
    }
    else
    {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude; 
      const now = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=Imperial`)
      const currentWeather = await now.json()
      currentTemp.textContent = `${Math.round(currentWeather.main.temp)}\u00B0`;
      location.textContent = `${currentWeather.name}`;
      weatherCondition.textContent = `${currentWeather.weather[0].main}`;
      weatherStat.src = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;
    }

  const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial&cnt=40`);

  const data = await promise.json();

  
  for (let i = 0; i < data.list.length; i++) {
    let dayTime1 = new Date(data.list[i].dt * 1000);
    let dayTime2 = new Date(data.list[i].dt * 1000 + 86400000);
    let dayTime3 = new Date(data.list[i].dt * 1000 + 86400000 * 2);
    let dayTime4 = new Date(data.list[i].dt * 1000 + 86400000 * 3);
    let dayTime5 = new Date(data.list[i].dt * 1000 + 86400000 * 4);
    let dayTime6 = new Date(data.list[i].dt * 1000 + 86400000 * 5);

    if(dayTime1.toLocaleDateString('en-US') === compareDay.toLocaleDateString('en-US')){
      day1MaxArr.push(data.list[i].main.temp_max);
      day1MinArr.push(data.list[i].main.temp_min);
      // console.log(Math.round(Math.floor(...day1MaxArr))) 
      // console.log(Math.round(Math.floor(...day1MinArr))) 
    }
  }
  date.textContent = `${day}`;
  console.log(day1MaxArr)
  console.log(day1MinArr)
  console.log(Math.round(Math.max(...day1MaxArr)))
  console.log(Math.round(Math.min(...day1MinArr)))
  highLow.innerText = `\uFFEA${Math.round(Math.max(...day1MaxArr))}\u00B0 \uFFEC ${Math.round(Math.min(...day1MinArr))}\u00B0`
  // currentTemp.textContent = `${Math.round(data.list[0].main.temp)}\u00B0`;
  // location.textContent = `${data.city.name}`;
  // weatherCondition.textContent = `${data.list[0].weather[0].main}`;
  // weatherStat.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;

}

function errorFunc(error) {
  console.log(error.message);
}

searchBtn.addEventListener('click', function(e){
  console.clear()
  console.log(searchBar.value)
  success(searchBar.value)
});