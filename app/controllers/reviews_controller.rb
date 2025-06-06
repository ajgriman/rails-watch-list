class ReviewsController < ApplicationController
  before_action :set_list, only: [:new, :create]

  # GET /lists/:list_id/reviews/new
  def new
    # @list is set by set_list
    @review = Review.new
  end

  # POST /lists/:list_id/reviews
  def create
    # @list is set by set_list
    @review = Review.new(review_params)
    @review.list = @list # Associate the review with the specific list

    if @review.save
      redirect_to list_path(@list), notice: 'Review was successfully created.' # Redirect to the list's show page
    else
      # If saving fails, we re-render the 'new' form.
      # The 'new.html.erb' for reviews will need @list to build the form's URL correctly.
      # And it needs @review (with errors) to display them.
      flash.now[:alert] = "Could not save review. Please check errors."
      render :new, status: :unprocessable_entity
    end
  end

  private

  def set_list
    @list = List.find(params[:list_id]) # Find the parent list from the URL
  end

  def review_params
    params.require(:review).permit(:content, :rating)
    # :list_id is not permitted here as we set it from @list
  end
end