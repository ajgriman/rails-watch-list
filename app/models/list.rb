class List < ApplicationRecord
  # == Associations ==
  has_many :bookmarks, dependent: :destroy
  has_many :movies, through: :bookmarks
  has_many :reviews, dependent: :destroy # Add this line

  # == Validations ==
  validates :name, presence: true, uniqueness: true

  # Validate the format of image_url if it's present.
  # Allows http and https URLs. Allows the field to be blank.
  validates :image_url, format: {
    with: URI::DEFAULT_PARSER.make_regexp(%w[http https]),
    message: "must be a valid URL (e.g., http://example.com/image.jpg)"
  }, allow_blank: true # Set allow_blank: false if an image_url should always be required
end