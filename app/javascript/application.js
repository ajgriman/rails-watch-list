// app/javascript/application.js
import "@hotwired/turbo-rails";
import "bootstrap";
import 'tom-select'; // For TomSelect

// This line ensures vendor/javascript/star-rating.js is loaded and executed by importmap.
// We are NOT trying to get any exports from it here. We expect it to create window.StarRating.
import 'star-rating-js';

// (TomSelect initialization code can remain as is, assuming it's working)
function initializeTomSelectOnMovieDropdown() {
  const selectElement = document.querySelector('select#bookmark_movie_id');
  if (selectElement && typeof TomSelect !== 'undefined') {
    if (selectElement._tomselect) { return; }
    try {
      new TomSelect(selectElement, { create: false, sortField: { field: "text", direction: "asc" }, placeholder: selectElement.getAttribute('prompt') || "Select a movie..."});
      // console.log("TomSelect initialized directly on #bookmark_movie_id.");
    } catch (e) { console.error("Error initializing TomSelect on #bookmark_movie_id:", e); }
  } else if (selectElement && typeof TomSelect === 'undefined') {
    // console.warn("TomSelect global not found for #bookmark_movie_id. Retrying in 250ms...");
    // setTimeout(initializeTomSelectOnMovieDropdown, 250); // Keep retry if TomSelect still needs it
  }
}

// Function to initialize StarRating by checking for the global StarRating object
function initializeStarRating() {
  const starRatingElements = document.querySelectorAll('.star-rating');

  if (starRatingElements.length > 0) {
    if (typeof window.StarRating !== 'undefined') { // Explicitly check window.StarRating
      starRatingElements.forEach(select => {
        if (!select._starRatingInitialized) { // Prevent re-initialization
          try {
            new window.StarRating(select, {
              // Options for star-rating.js can go here
              // e.g., clearable: true, maxStars: 5, etc.
              // The library usually infers count from select options.
            });
            select._starRatingInitialized = true;
            console.log("StarRating (vendored) initialized successfully using window.StarRating.");
          } catch (e) {
            console.error("Error initializing StarRating (vendored) from window.StarRating:", e);
          }
        }
      });
    } else {
      console.warn("window.StarRating not found. Retrying StarRating initialization in 250ms...");
      // Retry a few times with increasing delay or a maximum number of retries
      // This is a common pattern for scripts that might take a moment to declare their globals.
      let retries = 0;
      const maxRetries = 10; // Try for up to 2.5 seconds
      const retryInterval = 250;

      const attemptInit = () => {
        if (typeof window.StarRating !== 'undefined') {
          initializeStarRating(); // Call the main function again, it will find window.StarRating
        } else if (retries < maxRetries) {
          retries++;
          console.warn(`window.StarRating still not found. Retry ${retries}/${maxRetries}...`);
          setTimeout(attemptInit, retryInterval);
        } else {
          console.error("StarRating (vendored) global (window.StarRating) was not found after multiple retries.");
        }
      };
      setTimeout(attemptInit, retryInterval); // Initial retry
    }
  }
}

document.addEventListener('turbo:load', () => {
  initializeTomSelectOnMovieDropdown(); // Keep if TomSelect is used
  initializeStarRating();
});