class ListsController < ApplicationController
  before_action :set_list, only: [:show, :edit, :update, :destroy]

  # GET /lists
  def index
    @lists = List.all
  end

  # GET /lists/:id
  def show
    # @list is set by before_action :set_list
    # No additional logic needed here for now, unless we want to eager load associated data.
    # For example, if showing bookmarks on this page:
    @bookmark = Bookmark.new # For the simple_form_for
    @movies_for_select = Movie.order(:title) # For the movie selection dropdown
  end

  # GET /lists/new
  def new
    @list = List.new
  end

  # POST /lists
  def create
    @list = List.new(list_params)
    if @list.save
      redirect_to @list, notice: 'List was successfully created.'
      # Or redirect_to lists_path, notice: 'List was successfully created.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  # GET /lists/:id/edit
  def edit
    # @list is set by before_action :set_list
  end

  # PATCH/PUT /lists/:id
  def update
    # @list is set by before_action :set_list
    if @list.update(list_params)
      redirect_to @list, notice: 'List was successfully updated.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /lists/:id
  def destroy
    # @list is set by before_action :set_list
    @list.destroy
    redirect_to lists_url, notice: 'List was successfully destroyed.', status: :see_other
    # The status: :see_other is recommended for Turbo compatibility after a DELETE.
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_list
    @list = List.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def list_params
    params.require(:list).permit(:name, :image_url) # Add other attributes here if List model gets more, e.g., :image_url
  end
end