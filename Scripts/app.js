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
let compareDay2 = new Date(compareDay.getTime() + 86400000)
let compareDay3 = new Date(compareDay.getTime() + 86400000 * 2)
let compareDay4 = new Date(compareDay.getTime() + 86400000 * 3)
let compareDay5 = new Date(compareDay.getTime() + 86400000 * 4)
let compareDay6 = new Date(compareDay.getTime() + 86400000 * 5)
console.log(compareDay)
console.log(compareDay2)



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
  let day6MaxArr = []


  //Min Arrays
  let day1MinArr = []
  let day2MinArr = []
  let day3MinArr = []
  let day4MinArr = []
  let day5MinArr = [] 
  let day6MinArr = []

  //status arrays
  let day1StatusArr = []
  let day2StatusArr = []
  let day3StatusArr = []
  let day4StatusArr = []
  let day5StatusArr = []

  if(searchBar.value)
    {
      const search = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchBar.value}&limit=1&appid=${apiKey}`);
      const cityName = await search.json()
      latitude = cityName[0].lat;
      longitude = cityName[0].lon;
    }
    else
    {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude; 
    }

  const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial&cnt=40`);

  const data = await promise.json();
    
  

  for (let i = 0; i < data.list.length; i++) {
    let dayTime2 = new Date(data.list[i].dt * 1000);
   

    if(dayTime2.toLocaleDateString('en-US') === compareDay.toLocaleDateString('en-US')){
      day1MaxArr.push(data.list[i].main.temp_max);
      day1MinArr.push(data.list[i].main.temp_min);
    }
    else if(dayTime2.toLocaleDateString('en-US') === compareDay2.toLocaleDateString('en-US')){
      day2MaxArr.push(data.list[i].main.temp_max);
      day2MinArr.push(data.list[i].main.temp_min);
    }
    else if(dayTime2.toLocaleDateString('en-US') === compareDay3.toLocaleDateString('en-US')){
      day3MaxArr.push(data.list[i].main.temp_max);
      day3MinArr.push(data.list[i].main.temp_min);
    }
    else if(dayTime2.toLocaleDateString('en-US') === compareDay4.toLocaleDateString('en-US')){
      day4MaxArr.push(data.list[i].main.temp_max);
      day4MinArr.push(data.list[i].main.temp_min);
    }
    else if(dayTime2.toLocaleDateString('en-US') === compareDay5.toLocaleDateString('en-US')){
      day5MaxArr.push(data.list[i].main.temp_max);
      day5MinArr.push(data.list[i].main.temp_min);
    }
    else if(dayTime2.toLocaleDateString('en-US') === compareDay6.toLocaleDateString('en-US')){
      day6MaxArr.push(data.list[i].main.temp_max);
      day6MinArr.push(data.list[i].main.temp_min);
    }
  }
  date.textContent = `${day}`;
  highLow.innerText = `\uFFEA${Math.round(Math.max(...day1MaxArr))}\u00B0 \uFFEC ${Math.round(Math.min(...day1MinArr))}\u00B0`
  day1HiLow.innerText = `\uFFEA${Math.round(Math.max(...day2MaxArr))}\u00B0 \uFFEC ${Math.round(Math.min(...day2MinArr))}\u00B0`
  day2HiLow.innerText = `\uFFEA${Math.round(Math.max(...day3MaxArr))}\u00B0 \uFFEC ${Math.round(Math.min(...day3MinArr))}\u00B0`
  day3HiLow.innerText = `\uFFEA${Math.round(Math.max(...day4MaxArr))}\u00B0 \uFFEC ${Math.round(Math.min(...day4MinArr))}\u00B0`
  day4HiLow.innerText = `\uFFEA${Math.round(Math.max(...day5MaxArr))}\u00B0 \uFFEC ${Math.round(Math.min(...day5MinArr))}\u00B0`
  day5HiLow.innerText = `\uFFEA${Math.round(Math.max(...day6MaxArr))}\u00B0 \uFFEC ${Math.round(Math.min(...day6MinArr))}\u00B0`
  console.log(day2MaxArr)
  console.log(day2MinArr)
  console.log(Math.round(Math.max(...day2MaxArr)))
  console.log(Math.round(Math.min(...day2MinArr)))
  

  console.log(day5MaxArr)
  console.log(day5MinArr)
  console.log(Math.round(Math.max(...day5MaxArr)))
  console.log(Math.round(Math.min(...day5MinArr)))

  
  
  
  currentTemp.textContent = `${Math.round(data.list[0].main.temp)}\u00B0`;
  location.textContent = `${data.city.name}`;
  weatherCondition.textContent = `${data.list[0].weather[0].main}`;
  weatherStat.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;

}

function errorFunc(error) {
  console.log(error.message);
}

searchBtn.addEventListener('click', function(e){
  console.clear()
  console.log(searchBar.value)
  success(searchBar.value)
});