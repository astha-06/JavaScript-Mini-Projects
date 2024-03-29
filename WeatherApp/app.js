const api={
    key:"273fd8b9ad3e3728e3de2e00f40b1825",
    base:"https://api.openweathermap.org/data/2.5/weather"
}
const searchbox=document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);
function setQuery(evt) {
    if(evt.keyCode==13){ //13==enter key
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
    
}

function getResults(query){
    fetch(`${api.base}?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather=>{
        return weather.json();
    }).then(displayResults)
}

function displayResults(weather) {
    //console.log(weather);
    let city=document.querySelector('.location .city');
    city.innerText=`${weather.name}, ${weather.sys.country}`;

    let now=new Date();
    let date=document.querySelector('.location .date');
    date.innerText=dateBuilder(now);

    let temp=document.querySelector('.current .temp');
    temp.innerHTML=`${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el=document.querySelector('.current .weather');
    weather_el.innerHTML=weather.weather[0].main;

    let hilow=document.querySelector('.hi-low');
    hilow.innerText=`${Math.round(weather.main.temp_min)}°C/${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(d) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sun","Mon","Tues","Wed","thurs","Fri","Sat"];
    
    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}