 // Place all the behaviors and hooks related to the matching controller here.
 // All this logic will automatically be available in application.js.

var launchPayments = function(data, id) {
	var index = parseInt( id.replace('seat-','') );

	if (data[index].status == false) {
	    $('#checkout').show();

	    // block interaction on the rest of the screen
	    $('#lightbox').show();
	    $('html, body').css('overflow', 'hidden');

	    // add id to form so that we can update the correct musician in the database 
	    $('#id-field').val(id);
	}

}

var renderMusicians = function(data) {
	console.log(data);

	// draw orchestra on canvas
	var paper = Raphael('orchestra', 800, 500);

	var c, x, y;
	var status;
	for (i=0; i < seatingchart.length; i++) {

		x = seatingchart[i][0];
		y= seatingchart[i][1];

		c = paper.circle(x,y,10).attr({ fill: 'black' });
		c[0].id = 'seat-' + (i+1);

		c.hover(function() {
			this.attr({ r: 20, fill: 'blue' });
			showMusiciansPopup(data, this[0].id);
		});

		c.mouseout(function() {
			this.attr({ r: 10, fill: 'black' });
			hideMusiciansPopup();
		});

		c.click(function() {
			launchPayments(data, this[0].id);
		})
	}
}

var showMusiciansPopup = function(data, id) {
	var svg = $('svg');
	var popup = $('#orchestra .popup');

	var index = parseInt( id.replace('seat-','') );

	var instrument = data[index].instrument;
	var status = data[index].status;
	var sponsor = data[index].sponsor;

	var string = '<h3>' + instrument + '</h3>';

	if (status == true) {
		if (sponsor) {
			string += ('sponsored by ' + sponsor);
		} else {
			string += 'sponsored by an anonymous donor';
		}
	} else {
		string += 'click to sponsor';
	}

	popup.append(string);

	var element = document.getElementById(id);
	var height = popup.height();

	var x = svg.offset().left + element.cx.animVal.value - 50;
	var y = svg.offset().top + element.cy.animVal.value - height - 45;

	popup.css({'left': x, 'top': y});
}

var hideMusiciansPopup = function(id) {
	$('#orchestra .popup').empty();
	$('#orchestra .popup').css({ top: '0px', left: '-200px' });
}