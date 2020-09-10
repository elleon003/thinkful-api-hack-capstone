// Look at back correction functionality
function renderHomePage(){
  // clear out userInfo object
  Object.keys(userInfo).forEach(entry => delete userInfo[entry]);
  $('.js-page-display').html(`
    <form id="js-postal-code" class="user-submission">
      <label for="postal-code">Enter Your Postal Code:</label>
      <input type="text" id="postal-code" name="postal-code" minlength="5" maxlength="10" required>
      <input type="submit" class="btn" value="Next: Hairtype">
    </form>
    <div class="js-error hidden"></div>
  `)      
}

function renderErrorPage(error){
  renderHomePage();
  $(".js-error").removeClass('hidden');
  $("#postal-code").val("");
  $(".js-error").html(`<h3 style="color:red">${error}</h3>`);
}

function renderHairTypePage() {
  $(".js-page-display").html(`
    <div id="js-hair-info" class="modal">
      <iframe id="hair-article" src="https://hairtheme.com/curly-hair-types/#ftoc-heading-3" title="Curly Hair Types Article from HairTheme.com"></iframe>
    </div>
    <h3>Select your hair type:</h3>
    <a class="btn" href="#js-hair-info" rel="modal:open">Help! I don't know my hair type!</a>
    <form id="js-hair-types" class="user-submission">
      <label>
        <input type="radio" name="hair-type" value="1" required>
          <img class="hair-type-img" src="img/hair-type-1.jpg" alt="straight hair">
      </label>
      <label>
        <input type="radio" name="hair-type" value="2A" required>
        <img class="hair-type-img" src="img/hair-type-2a.jpg" alt="gentle wavy hair">
      </label>
      <label>
        <input type="radio" name="hair-type" value="2B" required>
        <img class="hair-type-img" src="img/hair-type-2b.jpg" alt="s shaped wavy hair">
      </label>
      <label>
        <input type="radio" name="hair-type" value="2C" required>
        <img class="hair-type-img" src="img/hair-type-2c.jpg" alt="defined wavy hair">
      </label>
      <label>
        <input type="radio" name="hair-type" value="3A" required>
        <img class="hair-type-img" src="img/hair-type-3a.jpg" alt="loose curly hair">
      </label>
      <label>
        <input type="radio" name="hair-type" value="3B" required>
        <img class="hair-type-img" src="img/hair-type-3b.jpg" alt="spiral curly hair">
      </label>
      <label>
        <input type="radio" name="hair-type" value="3C" required>
        <img class="hair-type-img" src="img/hair-type-3c.jpg" alt="springy curly hair">
      </label>
      <label>
        <input type="radio" name="hair-type" value="4A" required>
        <img class="hair-type-img" src="img/hair-type-4a.jpg" alt="s shaped coily hair">
      </label>
      <label>
        <input type="radio" name="hair-type" value="4B" required>
        <img class="hair-type-img" src="img/hair-type-4b.jpg" alt="zig zag coily hair">
      </label>
      <label>
        <input type="radio" name="hair-type" value="4C" required>
        <img class="hair-type-img" src="img/hair-type-4c.jpg" alt="tight coily hair">
      </label>
      <div class="break"></div>
      <input type="submit" role="button" class="btn" value="Next: Hair Length">
    </form>
    <button class="btn js-reset">Start Over</button>
  `)
  handleResetButton();
}

function renderHairLengthPage() {
  $('.js-page-display').html(`
    <h3>Select your closest hair length:</h3>
    <form id="js-hair-length" class="user-submission">
      <label>
        <input type="radio" name="hair-length" value="super short" required>
          <img class="hair-length-img" src="img/super-short-coily-hair.jpg" alt="Super Short hair, up to 3 inches">
      </label>
      <label>
        <input type="radio" name="hair-length" value="short" required>
          <img class="hair-length-img" src="img/short-wavy-hair.jpg" alt="Short hair, above the chin">
      </label>
      <label>
        <input type="radio" name="hair-length" value="midlength" required>
          <img class="hair-length-img" src="img/mid-length-curly-hair.jpg" alt="Medium length hair, down to, but not past the shoulders">
      </label>
      <label>
        <input type="radio" name="hair-length" value="long" required>
          <img class="hair-length-img" src="img/long-wavy-hair.jpg" alt="Long hair, past shoulders">
      </label>
      <div class="break"></div>
      <input type="submit" role="button" class="btn" value="Show Me Some Styles!">
    </form>
    <button class="btn js-reset">Start Over</button>
  `)
  handleResetButton();
}

function renderVideoListing(videos) {
  let videoFormattedList = '';
  for (let video in videos.items) {
    videoFormattedList += `
      <iframe src="https://www.youtube.com/embed/${videos.items[video].id.videoId}" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `
  }
  renderResultsPage(videoFormattedList);
  console.log(videos.items);
}

function renderResultsPage(videoFormattedList){
  $('h2').text('Weather for:');
  $('.js-page-display').html(`
    <div class="final-results">
      <h3 id="js-location">${userInfo['city']}, ${userInfo['state']}</h3>
      <p class="weather-results"><img src="img/icons/${userInfo['weather icon']}.png" alt="${userInfo['description']}"> ${userInfo['temp']}&#8457 ${userInfo['description']}</p>
      <p class="weather-results">Winds: ${userInfo['wind speed']}mph, Humidity ${userInfo['relative humidity']}&#37;</p>
      <div class="js-videos video-display">
        ${videoFormattedList}
      </div>
      <button class="btn js-reset">Start Over</button>
    </div>
    `)
}
