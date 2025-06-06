class BookmarksController < ApplicationController
  before_action :set_list, only: [:new, :create]
  before_action :set_bookmark, only: [:destroy]

  # GET /lists/:list_id/bookmarks/new
  def new
    @bookmark = Bookmark.new
    @movies_for_select = Movie.order(:title) # Provide movies for the select dropdown
  end

  def create
    @bookmark = Bookmark.new(bookmark_params)
    @bookmark.list = @list

    if @bookmark.save
      redirect_to @list, notice: 'Bookmark was successfully created.'
    else
      @movies_for_select = Movie.order(:title) # Reload movies if rendering new again
      render :new, status: :unprocessable_entity
    end
  end

  # DELETE /bookmarks/:id
  def destroy
    # @bookmark is set by set_bookmark
    list_to_redirect_to = @bookmark.list # Store the list before destroying the bookmark
    @bookmark.destroy
    redirect_to list_path(list_to_redirect_to), notice: 'Bookmark was successfully destroyed.', status: :see_other
  end

  private

  def set_list
    @list = List.find(params[:list_id]) # Find the parent list from the URL
  end

  def set_bookmark
    @bookmark = Bookmark.find(params[:id])
  end

  def bookmark_params
    params.require(:bookmark).permit(:comment, :movie_id)
    # :list_id is not permitted here because we set it manually from the nested route's @list
  end
end