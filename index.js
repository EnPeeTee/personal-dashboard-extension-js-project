fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        // console.log(data.urls.regular, data.user.name)
        document.body.style.backgroundImage = `url(${data.urls.full})`;
        document.getElementById("author").textContent = `By: ${data.user.name}`;
    })
    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1559666126-84f389727b9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Njk2NjAxMjM&ixlib=rb-4.0.3&q=80&w=1080)`;
        document.getElementById("author").textContent = `By: John Fowler`;
    });

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error(`${res.status} Something went wrong!`);
        };
        return res.json();
    })
    .then(data => {
        document.getElementById("crypto-top").innerHTML = `
        <img src=${data.image.small}> <span>${data.name}</span>` ;
        document.getElementById("crypto").innerHTML += `
        <div id="crypto-data">
            <span> Current: ₱ ${data.market_data.current_price.php}</span>
            <span> Highest: ₱ ${data.market_data.high_24h.php}</span>
            <span> Lowest: ₱ ${data.market_data.low_24h.php}</span>
        </div>`;
    })
    .catch(err => {console.error(err)});


// function getTime() {
//     const hour = new Date().getHours();
//     const minutes = new Date().getMinutes();
//     const arr = {
//         hr: hour, 
//         minutes: minutes, 
//         meridiem: "am"
//     };
//     if (hour > 12) {
//         arr.hr -= 12;
//         arr.meridiem = "pm";
//     };
//     return arr;
// }    
// document.getElementById("time").textContent = 
// `${getTime().hr}:${getTime().minutes} ${getTime().meridiem}`;


setInterval( () => {
    const date = new Date();
    document.getElementById("time").textContent = 
    date.toLocaleTimeString("en-us", {timeStyle: "short"})
    
    // console.log("A second has passed");
}
, 1000);

// Check Current Position:

// function currentPosition () {
//     const options = {
//         enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0
//     };

//     function success(pos) {
//         const crd = pos.coords;
        
//         console.log('Your current position is:');
//         console.log(`Latitude : ${crd.latitude}`);
//         console.log(`Longitude: ${crd.longitude}`);
//         console.log(`More or less ${crd.accuracy} meters.`);
//     };

//     function error(err) {
//         console.warn(`ERROR(${err.code}): ${err.message}`);
//     };

//     navigator.geolocation.getCurrentPosition(success, error, options);
// }

// currentPosition();

navigator.geolocation.getCurrentPosition(position => {
    const {latitude, longitude} = position.coords
    // console.log(position.coords)
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available");
            };
            return res.json();
        })
        .then(data => {
            const weather = data.weather[0];
            const iconUrl = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
            console.log(data);

            document.getElementById("weather-top").innerHTML = 
            `<img src=${iconUrl}> <span>${Math.floor(data.main.temp)}°C </span>`;
            document.getElementById("weather").innerHTML += `<p>${data.name}</p>`;
        })
        .catch(err => console.error(err));
});
