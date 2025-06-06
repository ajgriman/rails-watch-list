# app/helpers/reviews_helper.rb
module ReviewsHelper
  def display_stars(rating, max_stars = 5)
    full_stars = rating.to_i
    empty_stars = max_stars - full_stars

    stars_html = ""
    # Prepend a slash to indicate a root-relative path for files in public/
    full_stars.times { stars_html += image_tag('/img/star-full.svg', alt: 'Full Star', class: 'rating-star') }
    empty_stars.times { stars_html += image_tag('/img/star-empty.svg', alt: 'Empty Star', class: 'rating-star') }

    content_tag(:span, stars_html.html_safe, class: 'star-display')
  end
end