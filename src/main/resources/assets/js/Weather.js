var weathercontainer;
var weathercontent;

var Weather = {
  createWeather: function (theCoords) {
    weathercontainer = document.createElement('div');
    weathercontainer.setAttribute('id','weather');
    weathercontent = document.createElement('div');
    weathercontent.setAttribute('id','weather-content');
    weathercontainer.appendChild(weathercontent);

    theCoords = ol.proj.transform(theCoords, 'EPSG:3857', 'EPSG:4326');

    var url = "http://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/"
      + theCoords[0].toFixed(5) + "/lat/" + theCoords[1].toFixed(5) + "/data.json";

    $.ajax({
      url: url, dataType: 'json', success: function (response) {
        if (response.error) {
          alert(response.error.message + '\n' +
            response.error.details.join('\n'));
        } else {
          addWeatherToDiv(response.timeSeries);
        }
      }
    });

    var control = new ol.control.Control({
      element: weathercontainer
    });

    return control;
  }
};

function addWeatherToDiv(theTimeSeries) {
  var i = 0;
  while(i<24) {
    i += 6;
    var weather = document.createElement('div');
    weather.setAttribute('class', 'weatherresult');
    weather.innerHTML = theTimeSeries[i].parameters[1].values[0].toFixed(1)
      + getWeatherIcon(theTimeSeries[i].parameters[18].values[0]);
    weathercontent.appendChild(weather);
  }
}

function getWeatherIcon(iconNumber) {
  switch(iconNumber) {
    case 1:
    case 2:
      return '<i class="wi wi-day-sunny"></i>';
      break;
    case 3:
    case 6:
      return '<i class="wi wi-day-sunny-overcast"></i>';
      break;
    case 4:
      return '<i class="wi wi-day-cloudy"></i>';
      break;
    case 5:
      return '<i class="wi wi-cloudy"></i>';
      break;
    case 7:
      return '<i class="wi wi-fog"></i>';
      break;
    case 8:
      return '<i class="wi wi-showers"></i>';
      break;
    case 9:
      return '<i class="wi wi-thunderstorm"></i>';
      break;
    case 10:
    case 14:
      return '<i class="wi wi-sleet"></i>';
      break;
    case 11:
    case 15:
      return '<i class="wi wi-snow"></i>';
      break;
    case 12:
      return '<i class="wi wi-rain"></i>';
      break;
    case 13:
      return '<i class="wi wi-lightning"></i>';
      break;
  }
}
