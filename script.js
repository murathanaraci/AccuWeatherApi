const api_key = "btoHSAuEixWIs9kwRfL9SQ58jkxjA6Rj";
const sec = document.getElementById("sec");
const jsonUrl = "iller.json";
//listeden il seçme
sec.addEventListener("change", getSelectedCity);
//json veriyi optionlara ekleme
fetch(jsonUrl)
  .then((res) => res.json())
  .then((iller) => {
    iller.forEach((il) => {
      const listItem = document.createElement("option");
      listItem.textContent = `${il}`;
      sec.appendChild(listItem);
    });
  });
//optionlardan çekilen veriyi yazdırma
function getSelectedCity() {
  const selectedCity = sec.value;
  const locationUrl = `//dataservice.accuweather.com/locations/v1/cities/search?apikey=${api_key}&q=${selectedCity}`;
  fetch(locationUrl)
    .then((res) => res.json())
    .then((locationData) => {
      const locationKey = locationData[0].Key;
      const weatherUrl = `//dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${api_key}`;
      console.log("Location Data:", locationData);
      console.log(`Location Key for ${selectedCity}: ${locationKey}`);
      return fetch(weatherUrl);
    })
    
    .then((res) => res.json())
    .then((weatherData) => {
      console.log("Weather Data:", weatherData);
      const temp = weatherData[0].Temperature.Metric.Value;
      const text = weatherData[0].WeatherText;
      const icon = weatherData[0].WeatherIcon;
      document.getElementById("location").innerHTML = `HAVA DURUMU <br> ${selectedCity} `;
      document.getElementById("temperature").innerHTML = `${temp} C°`;
      document.getElementById("text").innerHTML = `${text}`;
      document.getElementById("icon").innerHTML = `<img src="images/${icon}-s.png" alt="img">`;
      console.log(temp, text, icon);
    });
}
