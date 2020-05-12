//source https://stackoverflow.com/questions/35427641/how-to-dynamically-set-the-active-class-in-bootstrap-navbar

$(document).ready(function () {
    var url = window.location;
    $('ul.nav a[href="'+ url +'"]').addClass('active');
    $('ul.nav a').filter(function() {
         return this.href == url;
    }).addClass('active');
});
