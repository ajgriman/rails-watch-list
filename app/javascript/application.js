// app/javascript/application.js
import "@hotwired/turbo-rails";
import "bootstrap";
import 'tom-select'; // For TomSelect

// This line ensures vendor/javascript/star-rating.js is loaded and executed by importmap.
// We are NOT trying to get any exports from it here. We expect it to create window.StarRating.
import 'star-rating-js';
import 'typed.js';
import 'aos';


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

// Function to initialize Typed.js
function initializeTypedJs() {
  const typedElement = document.getElementById('typed-lists-title');
  if (typedElement && typeof Typed !== 'undefined') { // Check for global Typed
    if (typedElement._typedInstance) { // Prevent re-initialization
        // typedElement._typedInstance.destroy(); // Optionally destroy old before creating new
        return;
    }
    try {
      typedElement._typedInstance = new Typed('#typed-lists-title', { // Target the ID
        strings: ['Movie Lists', 'Your Curated Collections', 'Discover & Share!'], // Text to type
        typeSpeed: 70,   // Speed of typing
        backSpeed: 40,   // Speed of backspacing
        backDelay: 1000, // Delay before starting to backspace
        loop: true,      // Loop the animation
        smartBackspace: true // Only backspace what doesn't match the next string
      });
      console.log("Typed.js initialized on #typed-lists-title.");
    } catch(e) {
      console.error("Error initializing Typed.js:", e);
    }
  } else if (typedElement && typeof Typed === 'undefined') {
    console.warn("Typed global not found. Retrying Typed.js initialization in 250ms...");
    setTimeout(initializeTypedJs, 250);
  }
}

function initializeAOS() {
  if (typeof AOS !== 'undefined') { // Checks window.AOS
    try {
      AOS.init({
        // duration: 800, // Optional global settings
        // once: true
      });
      console.log("AOS (vendored, modified) initialized.");
    } catch(e) {
      console.error("Error initializing AOS (vendored, modified):", e);
    }
  } else {
    console.warn("AOS global not found. Retrying AOS initialization in 250ms...");
    // Robust retry can be kept or simplified if the fix is reliable
    let retries = 0;
    const maxRetries = 5; // Try a few times
    const attemptInitAOS = () => {
      if (typeof AOS !== 'undefined') {
        initializeAOS(); // Call main function again
      } else if (retries < maxRetries) {
        retries++;
        setTimeout(attemptInitAOS, 250);
      } else {
        console.error("AOS global was not found after multiple retries (vendored, modified).");
      }
    };
    setTimeout(attemptInitAOS, 250);
  }
}

AOS.init({ /* options */ });
console.log("AOS object after init:", AOS);
// Check if any elements are being processed by AOS
setTimeout(() => { // Check after a slight delay
    const animatedElements = document.querySelectorAll('.aos-init.aos-animate');
    console.log("Elements with AOS classes:", animatedElements);
    if (animatedElements.length > 0) {
        console.log("AOS appears to be processing elements.");
    } else {
        console.log("AOS might not be finding/animating elements with data-aos attributes.");
    }
}, 500); // Wait 500ms for AOS to potentially apply classes

document.addEventListener('turbo:load', () => {
  initializeTomSelectOnMovieDropdown(); // Keep if TomSelect is used
  initializeStarRating();
  initializeTypedJs();
 // initializeAOS(); // Add this call
});
