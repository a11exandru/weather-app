window.addEventListener('load', () => {
    let long;
    let lat;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
        })
    } else {
        h1.textContent = "This is not working because you don't allow the location. Please allow the location to see the temperature."
    }
})