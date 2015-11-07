class DonationMailer < ActionMailer::Base
  default from: "donationbot@orchestral.com"

  def new_donor(donor_email)
  	require 'rest-client'

	API_KEY = ENV['MAILGUN_API_KEY']
	API_URL = "https://api:#{API_KEY}@api.mailgun.net/v2/<your-mailgun-domain>"

	RestClient.post API_URL+"/messages",
	    :from => "ev@example.com",
	    :to => "nikki@nicoleblee.com",
	    :subject => "This is subject",
	    :text => "Text body",
	    :html => "<b>HTML</b> version of the body!"
  end
end
