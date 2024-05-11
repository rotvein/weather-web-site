const apiKey = "928c83ba9f29a17fb68645ea08f9684f";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&";

const button = document.querySelector('.search button');
const input = document.querySelector('.search input');

button.addEventListener('click', processWeather);
input.addEventListener('keydown', e => {
	if (e.key === 'Enter') processWeather()
});

async function processWeather(cityInitial) {		
	const input = document.querySelector('.search input');
	let cityName = cityInitial || encodeURIComponent(input.value);
	
	const url = apiURL + `&appid=${apiKey}` + `&q=${cityName}`;
	console.log(url);

	const response = await fetch(url);
	
	if (response.status == '404') {		
		document.querySelector('.error').style.display = 'block';
		document.querySelector('.weather').style.display = 'none';
		return
	}	

	
	const data = await response.json();	

	document.querySelector('.error').style.display = 'none';	
	document.querySelector('.weather').style.display = 'block'

	const city = document.querySelector('.city');
	city.textContent = data.name;

	const weatherIcon = document.querySelector('.weather-icon');
	const mainData = data.weather[0].main.toLowerCase();
	weatherIcon.setAttribute('src', `./images/${mainData}.png`);

	const temp = document.querySelector('.temp');
	const tempData = Math.round(+data.main.temp);
	temp.textContent = tempData + '°C';

	const humidity = document.querySelector('.humidity');
	const humidityData = data.main.humidity;
	humidity.textContent = humidityData + '%';

	const wind = document.querySelector('.wind');
	const windData = data.wind.speed;
	wind.textContent = windData + ' km/h'

}

async function checkWeather() {
	const response = await fetch(apiURL + `&appid=${apiKey}`);

	let data = await response.json();

	console.log(data)
}


processWeather('Moscow')