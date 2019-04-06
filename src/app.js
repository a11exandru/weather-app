window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSpan = document.querySelector('.temperature-span');
    let degreeSection = document.querySelector('.degree-section');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/3e9bc6f4d369bc261389434089ed6417/${lat},${long}`;
        
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const {temperature, summary, icon} = data.currently;
                    // asta este to una cu
                        // const temperature = data.currently.temperature;
                        // const summary = data.currently.summary;

                        // Formula for the Celsius
                            let celsius = (temperature - 32) * 5/9;
                        temperatureDegree.innerHTML = Math.floor(celsius);


                        temperatureDescription.innerHTML = summary;

                        locationTimezone.innerHTML = data.timezone;

                        // change temperature to Fahrenheit
                        degreeSection.addEventListener('click', () => {
                            if (temperatureSpan.innerHTML != 'F') {
                                temperatureDegree.innerHTML = Math.floor(temperature);
                                temperatureSpan.innerHTML = 'F';
                            } else {
                                temperatureDegree.innerHTML = Math.floor(celsius);
                                temperatureSpan.innerHTML = '&#x2103';
                            }
                        });
                        // Set icon
                        setIcon(icon, document.querySelector('.icon'));
                })
        });
    } else {
        h1.textContent = "This is not working because you don't allow the location. Please allow the location to see the temperature."
    }

    function setIcon(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.toUpperCase().replace(/-/g, "_");
        skycons.play();

        return skycons.set(iconID, Skycons[currentIcon]);
    }
})
