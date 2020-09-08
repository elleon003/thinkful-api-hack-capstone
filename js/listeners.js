`use strict`

function formatQuery(params) {
  // function to format URL query for all API calls
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function fetchWeather(postalCode) {
  // API call to Weatherbit - return error if response data.count===0;
  // Weather: URL?key=[wAPI]&units=I&postal_code=[postalCode]
  const params = {
    key: wAPI,
    units: "I",
    postal_code: postalCode,
  };
  const queryString = formatQuery(params);
  const url = wURL + '?' + queryString;
  
  fetch(url)
    .then(response => {
      if (response.status !== 200) {
        throw new Error ("Sorry, didn't recognize that postal code. Please try again.")
      }
      return response.json();
    })
    .then(responseJson => formatWeatherParams(responseJson))
    .catch(error => renderPostalErrorPage(error));
  /*
    Responses I'm using:
    data.weather.description
    data.weather.icon
      use for img - [returned code].png
    data.rh(relative humidity returned as num)
    data.city_name
    data.state_code (returns a number when out of the US)
    data.country_code
    data.temp
    data.wind_spd
  */
}

// WEATHER INFO STOPS HERE - NEED TO PASS
function formatWeatherParams(weatherResponse) {
  // function to distill info from weather fetch and distill for video search
  console.log(weatherResponse.data[0].city_name);
  console.log(weatherResponse.data[0].state_code);
  console.log(weatherResponse.data[0].weather.description);
  console.log(weatherResponse.data[0].weather.icon);
  console.log(`Temp: ${weatherResponse.data[0].temp}`);
  // Weatherbit returns wind speed @meters per sec, multiply converts to mph
  console.log(`Wind speed: ${(weatherResponse.data[0].wind_spd * 2.237).toFixed(1)} mph`);
  console.log(`Relative Humidity: ${weatherResponse.data[0].rh}`);
  renderHairTypePage();
}

function fetchVideos(hairType, hairLength, ...weatherArgs) {
  // Take user input & weather api results to call YouTube API
  // YouTube format: URL?key=[yAPI]&
  console.log("fetchVideos");
}

function watchPostalForm() {
  // listener for postal code button -
  $('.js-page-display').on('submit', '#js-postal-code',(event => {
    event.preventDefault();
    const postalCode = $('#postal-code').val();
    fetchWeather(postalCode);
  }));
}

function handleResetButton(){
  $('.js-page-display').on('click', '.js-reset', () => {
    renderHomePage();
  });
}

function getUserResponse(choices) {
  let value;
  for (let choice in choices) {
    if (choices[choice].checked) {
      value = choices[choice].value;
      break
    }
  }
  return value;
}

function watchHairTypeForm() {
  $('.js-page-display').on('submit', '#js-hair-types', (event => {
    event.preventDefault();
    let userHairType = getUserResponse($('#js-hair-types').find('input[name=hair-type]'));
    console.log(userHairType);
    renderHairLengthPage();
  }))
}



function watchHairLengthForm() {
  console.log("watchHairLengthForm")
}

function runApp(){
  renderHomePage();
  watchPostalForm();
  watchHairTypeForm();
  watchHairLengthForm();
}

$(runApp);