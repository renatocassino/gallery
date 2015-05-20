class Image < ActiveRecord::Base
  has_attached_file :file, :styles => { :big => '800x500', :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/missing.png"
  validates_attachment_content_type :file, :content_type => /\Aimage\/.*\Z/
end
