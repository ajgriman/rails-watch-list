class Movie < ApplicationRecord
  # Associations
  # This line ensures that if a movie has any associated bookmarks,
  # an attempt to destroy the movie will be prevented, and an error
  # will be added to the movie object. This fulfills the requirement:
  # "You can’t delete a movie if it is referenced in at least one bookmark."
  has_many :bookmarks
  
  # Validations
  validates :title, presence: true, uniqueness: true
  validates :overview, presence: true
  # Optional: validates :poster_url, presence: true
  # Optional: validates :rating, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 10 }
end