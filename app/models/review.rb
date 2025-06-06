class Review < ApplicationRecord
  # == Associations ==
  belongs_to :list # Each review belongs to one list

  # == Validations ==
  # Content (the review text) must be present.
  validates :content, presence: true

  # Rating must be present.
  validates :rating, presence: true
  # Rating must be an integer.
  validates :rating, numericality: { only_integer: true }
  # Rating must be between 0 and 5 (inclusive). Adjust range as needed.
  # The screenshot implies stars, often 1-5, but 0 could be an option if desired.
  # Let's go with 0-5 for flexibility initially, or 1-5 if that's stricter.
  # The image shows 5 stars, with half-stars not obviously supported by integer rating.
  # Let's assume 1-5 stars.
  validates :rating, inclusion: { in: (1..5), message: "must be between 1 and 5" }

  # Optional: Limit length of content if desired
  # validates :content, length: { minimum: 10, maximum: 1000 }
end