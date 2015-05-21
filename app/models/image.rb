class Image < ActiveRecord::Base
  has_attached_file :file, :styles => { :big => '800x400', :medium => "300x300", :list => '210x150', :thumb => "100x100>" }, :default_url => "/images/missing.png"
  validates_attachment_content_type :file, :content_type => /\Aimage\/.*\Z/

  validates_presence_of :file, :name
end
