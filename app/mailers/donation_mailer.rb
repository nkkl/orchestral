class DonationMailer < ActionMailer::Base
  default from: "donationbot@orchestral.com"

  def new_donor(donor_email)
  	@donor = donor_email
  	mail(to: 'nikki@nicoleblee.com', subject: 'New donation processed')
  end
end
