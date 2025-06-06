// app/javascript/application.js
import "@hotwired/turbo-rails";
import "bootstrap";
// import Vue from 'vue'; // Not needed if only for TomSelect via this method
// import TomSelectMovieComponent from 'components/tom_select_movie'; // Not needed

// Import TomSelect script to ensure it's loaded by importmap
import 'tom-select';

function initializeTomSelectOnMovieDropdown() {
  const selectElement = document.querySelector('select#bookmark_movie_id'); // Target the specific select

  if (selectElement && typeof TomSelect !== 'undefined') {
    if (selectElement._tomselect) { // Check if already initialized
      // console.log("TomSelect already initialized on #bookmark_movie_id.");
      return;
    }
    try {
      new TomSelect(selectElement, {
        create: false,
        sortField: { field: "text", direction: "asc" },
        placeholder: selectElement.getAttribute('prompt') || "Select a movie..." // Use prompt from ERB
      });
      console.log("TomSelect initialized directly on #bookmark_movie_id.");
    } catch (e) {
      console.error("Error initializing TomSelect on #bookmark_movie_id:", e);
    }
  } else if (selectElement && typeof TomSelect === 'undefined') {
    console.warn("TomSelect global not found for #bookmark_movie_id. Retrying in 250ms...");
    setTimeout(initializeTomSelectOnMovieDropdown, 250);
  } else {
    // console.log("Select element #bookmark_movie_id not found for TomSelect on this page.");
  }
}

document.addEventListener('turbo:load', () => {
  initializeTomSelectOnMovieDropdown();

  // If you have other Vue instances for other parts of the page, they would go here.
  // e.g.
  // const mainVueApp = document.getElementById('vue-app-main');
  // if (mainVueApp) { /* new Vue({ el: ... }) */ }
});