  $.ajax({
    url: thequeryURL,
    method: "GET"
  })
  function populatetheCityWeather(city, citySearchList) {
    createCityList(citySearchList);
  
    var thequeryURL =
      "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=885e9149105e8901c9809ac018ce8658&q=" +
      city;
  
    var thequeryURL2 =
      "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=885e9149105e8901c9809ac018ce8658&q=" +
      city;
  
    var latitude;
  
    var longitude;
  
      // store data in an object
      .then(function(weather) {
        // Log the queryURL
        console.log(thequeryURL);
  
        // log the results here
        console.log(weather);
  
        var nowMoment = moment();
  
        var displaytheMoment = $("<h3>");
        $("#cityname").empty();
        $("#cityname").append(
          displaytheMoment.text("(" + nowMoment.format("M/D/YYYY") + ")")
        );
  
        var cityName = $("<h3>").text(weather.name);
        $("#cityname").prepend(cityName);
  
        var weatherIcon = $("<img>");
        weatherIcon.attr(
          "src",
          "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"
        );
        $("#current-icon").empty();
        $("#current-icon").append(weatherIcon);
  
        $("#thecurrenttemp").text("Temperature: " + weather.main.temp + " °F");
        $("#thecurrenthumidity").text("Humidity: " + weather.main.humidity + "%");
        $("#thecurrentwind").text("Wind Speed: " + weather.wind.speed + " MPH");
  
        latitude = weather.coord.lat;
        longitude = weather.coord.lon;
  
        var thequeryURL3 =
          "https://api.openweathermap.org/data/2.5/uvi/forecast?&units=imperial&appid=885e9149105e8901c9809ac018ce8658&q=" +
          "&lat=" +
          latitude +
          "&lon=" +
          longitude;
  
        $.ajax({
          url: thequeryURL3,
          method: "GET"
    
        }).then(function(uvIndex) {
          console.log(uvIndex);
  
          var uvIndexDisplay = $("<button>");
          uvIndexDisplay.addClass("btn btn-danger");
  
          $("#thecurrentuv").text("UV Index: ");
          $("#thecurrentuv").append(uvIndexDisplay.text(uvIndex[0].value));
          console.log(uvIndex[0].value);
  
          $.ajax({
            url: thequeryURL2,
            method: "GET"
        
          }).then(function(forecast) {
            console.log(thequeryURL2);
  
            console.log(forecast);
            // displaying forecast for 5 days
            for (var i = 6; i < forecast.list.length; i += 8) {
        
              var theforecastDate = $("<h5>");
  
              var forecastPosition = (i + 2) / 8;
  
              console.log("#1forecastdate" + forecastPosition);
  
              $("#1forecastdate" + forecastPosition).empty();
              $("#1forecastdate" + forecastPosition).append(
                theforecastDate.text(nowMoment.add(1, "days").format("M/D/YYYY"))
              );
  
              var theforecastIcon = $("<img>");
              theforecastIcon.attr(
                "src",
                "https://openweathermap.org/img/w/" +
                  forecast.list[i].weather[0].icon +
                  ".png"
              );
  
              $("#1forecasticon" + forecastPosition).empty();
              $("#1forecasticon" + forecastPosition).append(theforecastIcon);
  
              console.log(forecast.list[i].weather[0].icon);
  
              $("#1forecasttemp" + forecastPosition).text(
                "Temp: " + forecast.list[i].main.temp + " °F"
              );
              $("#1forecasthumidity" + forecastPosition).text(
                "Humidity: " + forecast.list[i].main.humidity + "%"
              );
  
              $(".forecast").attr(
                "style",
                "background-color:dodgerblue; color:white"
              );
            }
          });
        });
      });
  }
  function createCityList(citySearchList) {
    $("#thecitylist").empty();
  
    var keys = Object.keys(citySearchList);
    for (var i = 0; i < keys.length; i++) {
      var cityListEntry = $("<button>");
      cityListEntry.addClass("list-group-item list-group-item-action");
  
      var thesplitStr = keys[i].toLowerCase().split(" ");
      for (var j = 0; j < thesplitStr.length; j++) {
        thesplitStr[j] =
          thesplitStr[j].charAt(0).toUpperCase() + thesplitStr[j].substring(1);
      }
      var thetitleCaseCity = splitStr.join(" ");
      cityListEntry.text(thetitleCaseCity);
  
      $("#thecitylist").append(cityListEntry);
    }
  }
  $(document).ready(function() {
    var citySearchListString = localStorage.getItem("citySearchList");
  
    var citySearchaList = JSON.parse(citySearchListString);
  
    if (citySearchaList == null) {
      citySearchaList = {};
    }
  
    createCityList(citySearchaList);
  
    $("#thecurrentweather").hide();
    $("#forecast-weather").hide();
  
  
  
    $("#thesearchbutton").on("click", function(event) {
      event.preventDefault();
      var city = $("#thecityinput")
        .val()
        .trim()
        .toLowerCase();
  
      if (city != "") {
        //Cchecking to see if user entered any text
      
        citySearchaList[city] = true;
      localStorage.setItem("citySearchList", JSON.stringify(citySearchaList));
  
      populatetheCityWeather(city, citySearchaList);
  
      $("#thecurrentweather").show();
      $("#forecast-weather").show();
      }
  
      
    });
  
    $("#thecitylist").on("click", "button", function(event) {
      event.preventDefault();
      var city = $(this).text();
  
      populateCitytheWeather(city, citySearchList);
  
      $("#thecurrentweather").show();
      $("#forecast-weather").show();
    });