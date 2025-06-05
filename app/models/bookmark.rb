class Bookmark < ApplicationRecord
  # == Associations ==
  # Each bookmark must belong to a movie.
  belongs_to :movie

  # Each bookmark must belong to a list.
  belongs_to :list

  # == Validations ==
  # The comment must be present and have a minimum length of 6 characters.
  validates :comment, presence: true, length: { minimum: 6 }

  # A movie can only be bookmarked once per list.
  # This ensures the uniqueness of the movie_id and list_id pair.
  # The `scope: :list_id` means that the uniqueness of `movie_id` is considered
  # within the context of a specific `list_id`.
  validates :movie_id, uniqueness: { scope: :list_id, message: "is already bookmarked in this list" }
end