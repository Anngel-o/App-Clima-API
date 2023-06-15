const API_KEY = 'c5b8455ddaed162ba097b482739022f3';
const fetchData = position => { //Obtener la información del clima
    const {latitude, longitude} = position.coords; //Obtener latitud y longitud
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json()) //.then actua cuando se obtiene una respuesta
        .then(data => setWeatherData(data));
}

const setWeatherData = data =>{
    console.log(data);
    const weatherData = {
        location: data.name,
        description: data.weather[0].description,
        humidity: data.main.humidity + " %",
        pressure: data.main.pressure,
        temperature: data.main.temp + " °C",
        date: getDate(),
    }

    Object.keys(weatherData).forEach(key => {
        //Recorre weatherData y les otorga valores
        document.getElementById(key).textContent = weatherData[key];
    });
}

const getDate =() => {
    let date = new Date();
    return `${date.getDate()}-${( '0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
    //Si el mes ya tiene dos caracteres se le quita e '0' y si no, se le suma
}

const onLoad = () => {
    //Buscar la ubicación del usuario
    navigator.geolocation.getCurrentPosition(fetchData);
}