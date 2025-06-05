class List < ApplicationRecord
  # == Associations ==
  # A list can have many bookmarks.
  # If a list is deleted, all of its associated bookmarks should also be deleted.
  # The movies themselves will not be deleted as they can be part of other lists.
  has_many :bookmarks, dependent: :destroy

  # A list has many movies, accessible through the bookmarks.
  # This allows for easy querying like `list.movies`.
  has_many :movies, through: :bookmarks

  # == Validations ==
  # The name of the list must be present and unique.
  validates :name, presence: true, uniqueness: true
end