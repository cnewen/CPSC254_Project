//Sets value of form to options value
function parse_options() {
	document.getElementById('color').value = get_color();
	document.getElementById('enemy').value = !alone();
}
//Sets options to correct value
function save_options() {
	document.getElementById(get_color()).click();
	document.getElementById(alone() ? 'Alone' : 'Enemy').click();
}
//Gets the score from web parameters
function get_score() {
	const urlParams = new URLSearchParams(window.location.search);
	if (urlParams.get('score') == null) return 0;
	return urlParams.get('score');
}
//Returns web parameter named 'color' 
//Default is 'green'
function get_color() {
	const urlParams = new URLSearchParams(window.location.search);
	if (urlParams.get('color') == null) return 'green';
	return urlParams.get('color');
}	
//Returns if web parameter 'enemy' is 'false'
//Default is 'true'
function alone() {
	const urlParams = new URLSearchParams(window.location.search);
	if (urlParams.get('enemy') == null) return true;
	return urlParams.get('enemy') == 'false';
}
