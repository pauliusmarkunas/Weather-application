const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const apiKey = '0975f30a1cd39b836c56ac6f0cf6f187';
const searchBox = document.querySelector('#search-box');
const searchBtn = document.querySelector('#search-button');
const weatherIcon = document.querySelector('.weather-icon');
let city = 'Vilnius';
async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    document.querySelector('#location').innerHTML = data.name;
    document.querySelector('.t-value').innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector('#hum-value').innerHTML = data.main.humidity + '%';
    document.querySelector('#wind-value').innerHTML = Math.round((data.wind.speed*1000)/3600) + 'm/s';
    // FIX-----------------------------------------------
    let weatherSrc = `images/${data.weather[0].main}.png`;
    console.log(weatherSrc);
    weatherIcon.src = weatherSrc;
    // console.log(data);
    // console.log(weatherSrc);
};

searchBtn.addEventListener('click', ()=>{
    checkWeather(searchBox.value);
});

document.body.addEventListener('keydown', function(event){
    if(event.key === 'Enter' || event.keyCode === 13)checkWeather(searchBox.value);
});



// test for icon background
const iconContainer = document.querySelector('.icon-container');

function createSVGIcon() {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", "svg-icon");
  svg.setAttribute("viewBox", "0 0 256 256");

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("d", "M184,184a32,32,0,0,1-32,32c-13.7,0-26.95-8.93-31.5-21.22a8,8,0,0,1,15-5.56C137.74,195.27,145,200,152,200a16,16,0,0,0,0-32H40a8,8,0,0,1,0-16H152A32,32,0,0,1,184,184Zm-64-80a32,32,0,0,0,0-64c-13.7,0-26.95,8.93-31.5,21.22a8,8,0,0,0,15,5.56C105.74,60.73,113,56,120,56a16,16,0,0,1,0,32H24a8,8,0,0,0,0,16Zm88-32c-13.7,0-26.95,8.93-31.5,21.22a8,8,0,0,0,15,5.56C193.74,92.73,201,88,208,88a16,16,0,0,1,0,32H32a8,8,0,0,0,0,16H208a32,32,0,0,0,0-64Z");
  svg.appendChild(path);

  return svg;
}

function animateIcon(icon) {
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight;
  const endX = Math.random() * window.innerWidth;
  const endY = Math.random() * window.innerHeight;
  const duration = Math.random() * 10 + 5; // Random duration between 5 and 15 seconds

  icon.style.left = `${startX}px`;
  icon.style.top = `${startY}px`;

  icon.animate([
    { transform: `translate(${startX}px, ${startY}px)` },
    { transform: `translate(${endX}px, ${endY}px)` }
  ], {
    duration: duration * 1000,
    iterations: Infinity,
    easing: 'linear'
  });
}

function generateIcons() {
  for (let i = 0; i < 50; i++) {
    const icon = createSVGIcon();
    iconContainer.appendChild(icon);
    animateIcon(icon);
  }
}

generateIcons();