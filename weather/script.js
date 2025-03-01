const input = document.querySelector(".city-input");
let searchbtn =document.querySelector(".search-btn");
let mh = document.querySelector(".current-weather .details h2");
let temp = document.querySelector(".current-weather .details h6:nth-of-type(1)");
let wind = document.querySelector(".current-weather .details h6:nth-of-type(2)");
let humdity = document.querySelector(".current-weather .details h6:nth-of-type(3)");
let img = document.querySelector(" .current-weather .icon img");

let locationbtn= document.querySelector(".location-btn");
const apiKey = 'f3aafc68a73a0baf8017c775a95e39c9'; 
let city = ''; 


const fetchWeatherData = ()=>{
    if(!city){
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            
            
            mh.innerHTML = `${data.name} (${new Date(data.dt * 1000).toLocaleDateString()})`;
            temp.innerHTML =`Temperature: ${data.main.temp}°C`;
            wind.innerHTML= `Wind: ${data.wind.speed} M/S`;
            humdity.innerHTML= `Humidity: ${data.main.humidity}%`;
            
            const weatherIcon = data.weather[0].icon;
            
            
            const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
            img.src=iconUrl;
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            alert('Failed to fetch weather data. Please try again later.');
        });
    
}

searchbtn.addEventListener("click",()=>{
    city= (input.value.trim());
    fetchWeatherData();
})
input.addEventListener("keypress",(e) => {
    if(e.key==="Enter"){
        city= (input.value.trim());
        fetchWeatherData();
    }
    
})
locationbtn.addEventListener("click" ,()=>{

    navigator.geolocation.getCurrentPosition(
        (pos)=>{
            let lan = pos.coords.longitude;
            let lal = pos.coords.latitude;

            getWeatherData(lal,lan);
        }
    )

    
});

const getWeatherData = (lal,lan)=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lal}&lon=${lan}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            
            
            mh.innerHTML = `${data.name} (${new Date(data.dt * 1000).toLocaleDateString()})`;
            temp.innerHTML =`Temperature: ${data.main.temp}°C`;
            wind.innerHTML= `Wind: ${data.wind.speed} M/S`;
            humdity.innerHTML= `Humidity: ${data.main.humidity}%`;
            
            const weatherIcon = data.weather[0].icon;
            
            
            const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
            img.src=iconUrl;
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            alert('Failed to fetch weather data. Please try again later.');
        });
}