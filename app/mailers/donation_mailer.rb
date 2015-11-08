class DonationMailer < ActionMailer::Base
  default from: "donationbot@orchestral.com"

  def new_donor(donor_email, donor_name, should_include = 'test')
  	if should_include == 'on'
  		details = "Please include them in the public list of donors."
  	else
  		details = "Please DO NOT include them in the public list of donors."
  	end

	Mail.deliver do
		to 'nikki@nicoleblee.com'
		from 'donationbot@orchestral.com'
		subject 'New donation alert'
		body "A new donation was made! The donor, #{donor_name}, can be reached at #{donor_email}. #{details}."
	end
  end
end
