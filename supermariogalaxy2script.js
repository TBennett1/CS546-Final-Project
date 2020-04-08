/* ***** STICKY NAVBAR ***** */
window.onscroll = function() { sticky(); };
var topnav = document.getElementById("myTopnav");
var toggle = document.getElementById("toggle");
var threshold = topnav.offsetTop;

function sticky () {
  if (window.pageYOffset >= threshold) {
    topnav.classList.add("sticky");
    toggle.classList.add("stickytoggle");
  } else {
    topnav.classList.remove("sticky");
    toggle.classList.remove("stickytoggle");
  }
}
/* ***** END STICKY NAVBAR ***** */

/* ***** NAVBAR UNDERLINE ANIMATION  ***** */
let currentNavbar = $('#myTopnav a');
currentNavbar.on('click', function() {
		$('#myTopnav a').not(this).removeClass('underline');
		$(this).toggleClass('underline');
});

$('#myTopnav label').on('click', function() {
		$('#myTopnav label').not(this).removeClass('underline');
		$(this).toggleClass('underline');
});

$('#myTopnav2 a').on('click', function() {
  $('#myTopnav2 a').not(this).removeClass('underline');
  $(this).toggleClass('underline');
});

$('#myTopnav2 label').on('click', function() {
  $('#myTopnav2 label').not(this).removeClass('underline');
  $(this).toggleClass('underline');
});

$('#myTopnav3 a').on('click', function() {
  $('#myTopnav3 a').not(this).removeClass('underline');
  $(this).toggleClass('underline');
});

$('#myTopnav3 label').on('click', function() {
  $('#myTopnav3 label').not(this).removeClass('underline');
  $(this).toggleClass('underline');
});
/* ***** END NAVBAR UNDERLINE ANIMATION ***** */

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function myFunction2() {
  var x = document.getElementById("myTopnav2");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function myFunction3() {
  var x = document.getElementById("myTopnav3");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

