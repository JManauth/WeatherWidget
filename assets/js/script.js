//sets current day and time in the header
function renderClock(){
    $("#currentDay").text(moment().format("[Today is: ] dddd, MMMM Do YYYY, h:mm a"));
};
renderClock();
setInterval(renderClock, 1000);

// pull current location 
if('geolocation' in navigator) {
    currentLocation();
  } else {
    console.log('no');
  };

  //API key : 43cd2ebe15da8dcbd0ac1ecba5178ffc

function currentLocation(){
        //gets current location coordinates
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            console.log(lat);
            console.log(long);
            // finds city with coordinates and displays on website
            var location = document.getElementById('city');
            var geoAPIURL = 'https://api.openweathermap.org/geo/1.0/reverse?lat=' + lat + '&lon=' + long + '&limit=1&appid=43cd2ebe15da8dcbd0ac1ecba5178ffc';
            fetch(geoAPIURL)
              .then( Response => Response.json())
              .then( data => $(location).text(data[0].name + ', ' + data[0].state))
              
            //gets weather for current location
            function currentWeather(lat, long){
                var apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&units=imperial&exclude=hourly,minutely&appid=43cd2ebe15da8dcbd0ac1ecba5178ffc';

                fetch(apiURL)
                    .then( res => res.json())
                    .then( function(data){
                      console.log(data);
                      var temp = document.getElementById('temp');
                      var wind = document.getElementById('wind');
                      var humidity = document.getElementById('humidity');
                      var uv = document.getElementById('uv');
                      //displays weather conditions on screen
                      $(temp).text('Temp: ' + data.current.temp + '\u00B0' + 'F');
                      $(wind).text('Wind: ' + data.current.wind_speed + ' MPH');
                      $(humidity).text('Humidity: ' + data.current.humidity + '%');
                      $(uv).text('UV index: ' + data.current.uvi);

                      //display weather conditions for 5-day forecast
                      for( i = 1; i < 6; i++){
                        var dateDisplay = document.getElementById('date' + i);
                        temp[i] = document.getElementById('temp' + i);
                        $(dateDisplay).text(moment().add(i, 'days').format('M D YY'));
                        $(temp[i]).text('Temp: ' + data.daily[i].temp.day + '\u00B0' + 'F');
                      }
                    })
            }
            currentWeather(lat, long);
            });
};