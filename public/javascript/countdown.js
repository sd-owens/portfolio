
var deadline = new Date("Sep 1, 2020 07:30:00").getTime();

var x = setInterval(function() {
	var now = new Date().getTime();
	var t = deadline - now;
	var days = Math.floor(t / (1000 * 60 * 60 * 24));
	var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((t % (1000 * 60)) / 1000);
	document.getElementById("countdown").innerHTML =
		days +
		"d " +
		hours +
		"h " +
		minutes +
		"m " +
		seconds +
		"s ";
	if (t < 0) {
		clearInterval(x);
		document.getElementById("countdown").innerHTML = "It's new job time!";
	}
}, 1000);
