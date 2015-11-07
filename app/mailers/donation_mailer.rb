class DonationMailer < ActionMailer::Base
  default from: "donationbot@orchestral.com"

  def new_donor(donor_email)
  	@donor_email = donor_email
	mail(:to => 'nikki@nicoleblee.com',
		:subject => 'New donation')	
  end
end
