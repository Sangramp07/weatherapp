document.querySelector('button').addEventListener('click', () => {

    const place = document.getElementById('cityInput').value.trim();
    const element = document.getElementById('weatherCard');

    if (place === "") {
        element.innerHTML = "Please enter a city name.";
        return;
    }

    element.innerHTML = "Loading...";

    fetch(`http://api.weatherapi.com/v1/current.json?key=9b8bfa4feb144910a83113734261502&q=${place}&aqi=yes`
)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            element.innerHTML = `
                <h2>${data.location.name}</h2>
                <p> Temperature: ${data.current.temp_c}°C</p>
                <p> Condition: ${data.current.condition.text}</p>
                <p> Wind: ${data.current.wind_kph} km/h</p>
            `;
        })
        .catch(error => {
            element.innerHTML = "Error: " + error.message;
        });

});
