class TodoGroupsController < ApplicationController
  before_filter :set_group, only: [:show, :edit, :upate, :destroy]

  def index
    @todo_groups = TodoGroup.all
  end

  def new
    @todo_group = TodoGroup.new
  end

  def create
    @todo_group = TodoGroup.new(group_params)

    respond_to do |format|
      if @todo_group.save
        format.html { redirect_to @todo_group, notice: 'Group was successfully created.' }
        format.json { render action: 'show', status: :created, location: @todo_group }
      else
        format.html { render action: 'new' }
        format.json { render json: @todo_group.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
  end

  def update
  end

  def destroy
  end

  def show
  end

  private
    def set_group
      @todo_group = TodoGroup.find_by_id(params[:id])
    end

    def group_params
      params.require(:todo_group).permit(:name)
    end
end
