class Category < ActiveRecord::Base
	has_many :products
	has_many :subcategories, class_name: "Category", 
							  foreign_key: "supercategory_id"

	belongs_to :supercategory, class_name: "Category"

	validates :name, uniqueness: {message: "Ya existe una categoria con este nombre."}, case_sensitive: false;
end
