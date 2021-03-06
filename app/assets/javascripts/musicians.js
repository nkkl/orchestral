 // Place all the behaviors and hooks related to the matching controller here.
 // All this logic will automatically be available in application.js.
var sponsorableColor = '#00E5E6';
var sponsoredColor = '#B3FFFF';
var unsponsorableColor = '#EEE';

var launchPayments = function(data, id) {
	var index = parseInt( id.replace('seat-','') );

	if (data[index].status == false) {
		$('#checkout .information').empty();
		$('#checkout .information').append('<h3>Sponsor this ' + data[index].instrument + '</h3>');

	    $('#checkout').show();

	    // block interaction on the rest of the screen
	    $('#lightbox').show();

	    if ( $(window).width() < 992 ) {
	    	$('body').css('overflow', 'hidden');
	    }

	    // add id to form so that we can update the correct musician in the database 
	    // offset by one because JavaScript indexes at 0 and Rails indexes at 1
	    $('#id-field').val(index + 1);
	}

}

var renderMusicians = function(data) {
	// calculate how many days are left
	// push that information into the counter
	var d = new Date();
	var year = d.getFullYear();
	var counterString = '';

	if (year <= 2015) {
		var month = d.getMonth() + 1;
		
		if (month <= 11) {
			var day = d.getDate();

			var daysRemaining = 19 - day;

			if (daysRemaining == 1) {
				counterString = '1 day to go!';
			} else {
				counterString = daysRemaining + ' days to go!';
			}

		} else {
			counterString = 'The concert is already over.';
		}
	} else {
		counterString = 'The concert is already over';
	}

	$('.counter #days').text(counterString);

	// initialize basic variables
	// numSponsored and numStudents for our progress bar
	var numSponsored = 0;
	var numStudents = 0;

	if ( $(window).width() < 992 ) {
		// if we're on mobile, don't render the map
		for (i=0; i < data.length;i++) {
			if (i == 0) {
				// create section heading for first instrument
				$('#orchestra').append('<h2>' + data[i].instrument + '</h2>');
			} else if (data[i].instrument != data[i-1].instrument) {
				// and for any musician whose instrument doesn't match the previous musician's
				$('#orchestra').append('<h2>' + data[i].instrument + '</h2>');
			}

			if (data[i].student == true && data[i].status == false) {
				// if the student is available for sponsorship
				$('#orchestra').append('<div id="seat-' + i + '"">' + data[i].instrument + '<button>Sponsor</button></div>');

				numStudents++;
			} else if (data[i].student == true && data[i].status == true) {
				// otherwise, if the student is already sponsored
				$('#orchestra').append('<div id="seat-' + i + '"">' + data[i].instrument + '<span>Sponsored</span>');

				// increment the number of sponsored musicians
				numSponsored++;
				numStudents++;
			}
		}

		$('#orchestra button').click(function() {
			launchPayments(data, $(this).parent().attr('id'));
		});
	} else {
		// initialize basic variables
		// c, x, y are for SVG elements
		var c, x, y;

		// draw orchestra on canvas
		var paper = Raphael('orchestra', 800, 500);

		// make a conductor
		var c = paper.rect(450,400,100,55);
		c.attr({ fill: '#CCC', stroke: 'none' });

		// draw musicians
		for (i=0; i < seatingchart.length; i++) {

			x = seatingchart[i][0];
			y= seatingchart[i][1];

			// create new SVG element (circle) for each seat in the orchestra
			if (data[i]) {
				// if the seat is for a student AND not sponsored, highlight it so that it can be sponsored
				if (data[i].student == true && data[i].status == false) {
					c = paper.circle(x,y,15).attr({ fill: sponsorableColor, stroke: 'none' });

					// bind a unique identifier to each SVG element
					// this avoids issues with closures
					c[0].id = 'seat-' + i;

					// if a student can be sponsored, launch payments modal when element is clicked
					c.click(function() {
						launchPayments(data, this[0].id);
					});

					numStudents++;
				} else if (data[i].student == true && data[i].status == true) {
					c = paper.circle(x,y,15).attr({ fill: sponsoredColor, stroke: 'none' });
					c[0].id = 'seat-' + i;

					// if the student is sponsored, increment the number of sponsored students
					numSponsored++;
					numStudents++;
				} else {
					c = paper.circle(x,y,15).attr({ fill: unsponsorableColor, stroke: 'none' });
					c[0].id = 'seat-' + i;
				}

				// bind hover functionality to each SVG element
				// on hover, enlarge the SVG element and display a popup
				c.hover(function() {
					this.attr({ r: 20 });
					showMusiciansPopup(data, this[0].id);
				});

				// when hover ends, restore the original size and hide the popup
				c.mouseout(function() {
					this.attr({ r: 15 });
					hideMusiciansPopup();
				});
			} else {
				c = paper.circle(x,y,15).attr({ fill: 'black', stroke: 'none' });
			}
			
		}
	}
		
	$('#numSponsored').text(numSponsored + '/' + numStudents);
}

var showMusiciansPopup = function(data, id) {
	var svg = $('svg');
	var popup = $('#orchestra .popup');

	// look up index based on element id
	var index = parseInt( id.replace('seat-','') );

	var instrument = data[index].instrument;
	var status = data[index].status;
	var student = data[index].student;
	var sponsor = data[index].sponsor;

	var string = '<h3>' + instrument + '</h3>';

	// generate text explaining the sponsorship status of the musician
	if (student == true && status == true) {
		if (sponsor) {
			string += ('sponsored by ' + sponsor);
		} else {
			string += 'sponsored by an anonymous donor';
		}
	} else if (student == true && status == false) {
		string += 'click to sponsor';
	} else {
		string += 'professional musician';
	}

	popup.append(string);

	var element = document.getElementById(id);
	var height = popup.height();

	// find the absolute coordinates of the hovered element
	// then offset by half the width to center horizontally
	// and the entire height to display above the hovered element
	// then shift by the height of the element plus a little padding
	var x = svg.offset().left + element.cx.animVal.value - 75;
	var y = svg.offset().top + element.cy.animVal.value - height - 40;

	// move the popup into view
	popup.css({'left': x, 'top': y});
}

var hideMusiciansPopup = function(id) {
	$('#orchestra .popup').empty();
	$('#orchestra .popup').css({ top: '0px', left: '-200px' });
}