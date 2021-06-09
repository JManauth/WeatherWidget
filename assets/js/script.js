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
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            console.log(lat);
            console.log(long);
            var location = document.getElementById('city');
            var geoAPIURL = 'http://api.openweathermap.org/geo/1.0/reverse?lat=' + lat + '&lon=' + long + '&limit=1&appid=43cd2ebe15da8dcbd0ac1ecba5178ffc';
            fetch(geoAPIURL)
              .then( Response => Response.json())
              .then( data => $(location).text(data[0].name + ', ' + data[0].state))
              
              
            function currentWeather(lat, long){
                var apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&units=imperial&exclude=hourly,minutely&appid=43cd2ebe15da8dcbd0ac1ecba5178ffc';

                fetch(apiURL)
                    .then( res => res.json())
                    .then( data => console.log(data))

            }
            currentWeather(lat, long);
            });
    };