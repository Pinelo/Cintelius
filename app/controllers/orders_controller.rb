class OrdersController < ApplicationController
	def index
		@orders = Order.all
	end

	def new
		@categories = Category.where(supercategory_id: nil)
		@order = Order.new
	end
end
