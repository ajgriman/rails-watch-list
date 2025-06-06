# Pin npm packages by running ./bin/importmap

pin "application"
pin "bootstrap", to: "https://ga.jspm.io/npm:bootstrap@5.3.2/dist/js/bootstrap.esm.js" # Adjust version if needed
pin "@popperjs/core", to: "https://ga.jspm.io/npm:@popperjs/core@2.11.8/dist/esm/popper.js" # Adjust version if needed
pin "vue", to: 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.min.js'
pin_all_from "app/javascript/components", under: "components"
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "tom-select", to: "https://cdn.jsdelivr.net/npm/tom-select@2.3.1/dist/js/tom-select.complete.js"
pin "star-rating-js", to: "star-rating.js"