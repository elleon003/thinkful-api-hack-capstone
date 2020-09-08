// Look at back correction functionality
function renderHomePage(){
  $('.js-page-display').html(`
    <form id="js-postal-code" class="user-submission">
      <label for="postal-code">Enter Your Postal Code:</label>
      <input type="text" id="postal-code" name="postal-code" minlength="5" maxlength="10" required>
      <input type="submit" class="btn" value="Next: Hairtype">
    </form>
    <div class="js-error hidden"></div>
  `)
}

function renderPostalErrorPage(error){
  $(".js-error").removeClass('hidden');
  $("#postal-code").val("");
  $(".js-error").html(`<h3 style="color:red">${error}</h3>`);
}


function renderHairTypePage() {
  $(".js-page-display").html(`
    <h3>Select your hair type:</h3>
    <form id="js-hair-types" class="user-submission">
      <label>
        <input type="radio" name="hair-type" value="1" required>
          1
      </label>
      <label>
        <input type="radio" name="hair-type" value="2A" required>
          2A
      </label>
      <label>
        <input type="radio" name="hair-type" value="2B" required>
          2B
      </label>
      <label>
        <input type="radio" name="hair-type" value="2C" required>
          2C
      </label>
      <label>
        <input type="radio" name="hair-type" value="3A" required>
          3A
      </label>
      <label>
        <input type="radio" name="hair-type" value="3B" required>
          3B
      </label>
      <label>
        <input type="radio" name="hair-type" value="3C" required>
          3C
      </label>
      <label>
        <input type="radio" name="hair-type" value="4A" required>
          4A
      </label>
      <label>
        <input type="radio" name="hair-type" value="4B" required>
          4B
      </label>
      <label>
        <input type="radio" name="hair-type" value="4C" required>
          4C
      </label>
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
        <input type="radio" name="hair-length" value="short" required>
          <img class="hair-length-img" src="Resources/short-wavy-hair.jpg" alt="Short hair, above the chin">
      </label>
      <label>
        <input type="radio" name="hair-length" value="medium" required>
          <img class="hair-length-img" src="Resources/shoulder-length-curly-hair.jpg" alt="Medium length hair, down to, but not past the shoulders">
      </label>
      <label>
        <input type="radio" name="hair-length" value="long" required>
          <img class="hair-length-img" src="Resources/long-wavy-hair.jpg" alt="Long hair, past shoulders">
      </label>
      <input type="submit" role="button" class="btn" value="Show Me Some Styles!">
    </form>
    <button class="btn js-reset">Start Over</button>
  `)
  handleResetButton();
}