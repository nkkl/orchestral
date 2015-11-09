class MusiciansController < ApplicationController
  before_action :set_musician, only: [:show, :edit, :update, :destroy]

  # GET /musicians
  # GET /musicians.json
  def index
    @musicians = Musician.order(:id).all

    # generate client token, to be grabbed by js in UI
    @client_token = Braintree::ClientToken.generate

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @musicians }
      format.json {render :json=>@musicians}
    end
  end

  # GET /musicians/1
  # GET /musicians/1.json
  def show
  end

  # GET /musicians/new
  def new
    @musician = Musician.new
  end

  # GET /musicians/1/edit
  def edit
  end

  # POST /musicians
  # POST /musicians.json
  def create
  end

  # PATCH/PUT /musicians/1
  # PATCH/PUT /musicians/1.json
  def update
    # find our musician
    @musician = Musician.find(params[:id])

    # set the status to true
    @musician.update_attributes(:status => true)
    @musician.save

    respond_to do |format|
      format.js {render inline: "location.reload();" }
    end
  end

  # DELETE /musicians/1
  # DELETE /musicians/1.json
  def destroy
    @musician.destroy
    respond_to do |format|
      format.html { redirect_to musicians_url, notice: 'Musician was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def checkout
    # do the money thing
    nonce = params[:payment_method_nonce]

    result = Braintree::Transaction.sale(
      :amount => "50.00",
      :payment_method_nonce => nonce
      )

    if result.success?
      # find our musician
      @musician = Musician.find(params[:id])

      # set the status to true
      @musician.update_attributes(:status => true)

      # if the donor has opted in, save their name to display on the map
      if params[:donorname] && params[:include]
        @musician.update_attributes(:sponsor => params[:donorname])
      end
      @musician.save

      # send an email notifying of the donation
      DonationMailer.new_donor(params[:donoremail],params[:donorname],params[:include])

      flash[:notice] = "Thanks for donating! Look for a concert ticket in your inbox – see you on the 18th!"
      redirect_to root_url
    else
      result.errors.each do |error|
        puts error.attribute
        puts error.code
        puts error.message
      end

      flash[:notice] = "Sorry, something went wrong! Please try again."

      redirect_to root_url
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_musician
      @musician = Musician.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def musician_params
      params.require(:musician).permit(:instrument, :status, :sponsor)
    end
end
