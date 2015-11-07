class DonationMailer < ActionMailer::Base
  default from: "donationbot@orchestral.com"

  def new_donor(donor_email)
  	@donor = donor_email
	
	Mail.deliver do
		to 'nikki@nicoleblee.com'
		from 'donationbot@orchestral.com'
		subject 'testing send mail'
	end
  end
end
