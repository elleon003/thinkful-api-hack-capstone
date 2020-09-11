`use strict`

const userInfo = {};

function cycleImages() {
  let $active = $('#home-page-img-cycler .active');
  let $next = ($active.next().length > 0) ? $active.next() : $('.home-page-img:first');
  $next.css('z-index', 2);
  $active.fadeOut(1500, () =>{
    $active.css('z-index', 1).show().removeClass('active');
    $next.css('z-index', 3).addClass('active');
  })
}

// function to format URL query for all API calls
function formatQuery(params) {
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

// Weatherbit API call
function fetchWeather(postalCode) {
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
    .catch(error => renderErrorPage(error));
}

// add weather info to userInfo object for later use
function formatWeatherParams(weatherResponse) {
  // Add country instead of state for non-US postal codes
  if (parseInt(weatherResponse.data[0].state_code)) {
    userInfo['state'] = weatherResponse.data[0].country_code;
  } else {
    userInfo['state'] = weatherResponse.data[0].state_code;
  }
  userInfo['city'] = weatherResponse.data[0].city_name;
  userInfo['description'] = weatherResponse.data[0].weather.description;
  userInfo['weather icon'] = weatherResponse.data[0].weather.icon;
  userInfo['temp'] = weatherResponse.data[0].temp;
  userInfo['relative humidity'] = weatherResponse.data[0].rh;
  // Weatherbit returns wind speed @meters per sec, multiply converts to mph
  userInfo['wind speed'] = parseInt((weatherResponse.data[0].wind_spd * 2.237).toFixed(1));
  renderHairTypePage();
}

function watchPostalForm() {
  $('.js-page-display').on('submit', '#js-postal-code',(event => {
    event.preventDefault();
    const postalCode = $('#postal-code').val();
    userInfo['postal code'] = postalCode;
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
    userInfo['hair type'] = userHairType;
    renderHairLengthPage();
  }))
}

function watchHairLengthForm() {
  $('.js-page-display').on('submit', '#js-hair-length', (event => {
    event.preventDefault();
    let userHairLength = getUserResponse($('#js-hair-length').find('input[name=hair-length]'));
    userInfo['hair length'] = userHairLength;
    formatSearchTerms();
  }))
}

function formatSearchTerms() {
  let userQuery = "";
  if (userInfo['relative humidity'] >= 50) {
    userQuery += "humid weather ";
  }
  if (userInfo['temp'] >= 75) {
    userQuery += "hot weather "
  }
  userQuery += `hairstyles for hair type ${userInfo['hair type']} ${userInfo['hair length']} hair`;
  
  fetchVideos(userQuery);
}

// YouTube API call
function fetchVideos(userQuery) {
  const params = {
    key: yAPI,
    maxResults: 6,
    part: "snippet",
    type: "video",
    q: userQuery,
  }
  const queryString = formatQuery(params);
  const url = yURL + '?' + queryString;
  console.log(url);

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error ("Sorry! There's an issue with YouTube. Please try again in a few minutes.")
      }
      return response.json();
    })
    .then(responseJson => renderVideoListing(responseJson))
    .catch(error => renderErrorPage(error));
}

function runApp(){
  renderHomePage();
  setInterval('cycleImages()', 3000);
  watchPostalForm();
  watchHairTypeForm();
  watchHairLengthForm();
}

$(runApp);