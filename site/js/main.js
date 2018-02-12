var intervalId;
var cycleInterval = 1000;
var startRadius = 12;
var radius = 24;
var maxRadius = 48;

var from = 1000*2; 
var to = 1000*5; 
// setTimeout(startGloing, Math.floor(Math.random() * (to - from + 1) + from));

function startGloing() {
    intervalId = setInterval(gloText, cycleInterval);  
 }  
  
function gloText() {
    var node = document.getElementById('logo');
    //node.style.textShadow = "0 0 " + radius + "px #FFFF33, 0 0 12px #FFDD33, 0 0 24px #FF8800, 0 0 48px #FF2200";
    let radii = [radius];
    for (let i = 1; i < 5; i++) {
      radii[i] = radii[i-1]*2;
    }
    node.style.textShadow = "0 0 " + radii[0] + "px #7899D6, "
        + "0 0 " + radii[1] + "px #93ADDE, "
        + "0 0 " + radii[2] + "px #AEC1E6, "
        + "0 0 " + radii[3] + "px #C9D6EE";
    if (radius == maxRadius) {
        clearInterval(intervalId);
        intervalId = setInterval(unGloText, cycleInterval);
    } else {
        radius = radius * 2;
    }
}

function unGloText() {
    var node = document.getElementById('logo'); 
    //node.style.textShadow = "0 0 " + radius + "px #FFFF33, 0 0 12px #FFDD33, 0 0 24px #FF8800, 0 0 48px #FF2200";
    node.style.textShadow = "0 0 " + radius + "px #7899D6, 0 0 12px #93ADDE, 0 0 24px #AEC1E6, 0 0 48px #C9D6EE";
    if (radius == startRadius) {
        clearInterval(intervalId);
        var from = 1000*60*.5 // 30 seconds
        var to = 1000*60*1; // 1 minute
        setTimeout(startGloing, Math.floor(Math.random() * (to - from + 1) + from));
    } else {
        radius = radius / 2;
    }
}
