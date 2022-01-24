window.addEventListener('load', () => {
    let lon;
    let lat;
    let desc = document.querySelector(".desc");
    let degrees = document.querySelector(".degrees");
    let timezone = document.querySelector(".timezone");
    let place = document.querySelector(".country");
    let humid = document.querySelector(".humid");
    let feels = document.querySelector(".feels");
    let icons = document.querySelector(".icon");
    let container = document.querySelector(".container-temp");
    const changeMetric = document.querySelector(".container-temp span");
    const changeMetricF = document.querySelector(".container-feels span");

    const apikey = "8cf104c6067266184e95d1f9ca285dbd";

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
                // console.log(lon);
            lat = position.coords.latitude;
                // console.log(lat);

            const api = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=1&units=imperial&appid=${apikey}`;

            fetch(api)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    // console.log(data);
                    const { temp } = data.list[0].main;
                    degrees.textContent = Math.round(temp);
                    const { description } = data.list[0].weather[0];
                    desc.textContent = description;
                    const { name } = data.list[0];
                    timezone.textContent = name;
                    const { country } = data.list[0].sys;
                    place.textContent = country;
                    const { feels_like } = data.list[0].main;
                    feels.textContent = Math.round(feels_like);
                    const { humidity } = data.list[0].main;
                    humid.textContent = humidity;
                    const { icon } = data.list[0].weather[0];
                    icons.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png"></img>`;

                        const celsius = (temp - 32) * (5 / 9);
                        const celsiusFeel = (feels_like - 32) * (5 / 9);

                        container.addEventListener('click', () => {
                            if(changeMetric.textContent === "F") {
                                changeMetric.textContent = "C";
                                changeMetricF.textContent = "C";
                                degrees.textContent = Math.round(celsius);
                                feels.textContent = Math.round(celsiusFeel);
                            } else {
                                changeMetric.textContent = "F";
                                changeMetricF.textContent = "F";
                                degrees.textContent = Math.round(temp);
                                feels.textContent = Math.round(feels_like);
                            }
                        });
                });
        });
    }
});