class DonationMailer < ActionMailer::Base
  default from: "donationbot@orchestral.com"

  def new_donor(donor_email, donor_name, should_include = 'test')
	Mail.deliver do
		to 'nikki@nicoleblee.com'
		from 'donationbot@orchestral.com'
		subject 'New donation alert'
		body "A new donation was made! The donor, #{donor_name}, can be reached at #{donor_email}. #{should_include}"
	end
  end
end
