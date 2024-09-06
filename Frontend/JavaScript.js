const durationInSeconds = 100;
let ratingPerSecond = new Array();      //Array für das Rating in jeder Sekunde(Index)
const rangePerSecond = (1300 -50) / durationInSeconds;    //Den Abstand den jede Sekunde in der Grafik hat, abhängig von der Gesamtdauer in Sekunden   
let locationPerSecond = new Array();    //Array, das aus dem Abstand die jeweilige x-Koordinate pro Sekunde speichert
let lineHeightArray = new Array();  //Array für die jeweilige y-Position pro Wertungsstufe
let Timer = 0;
let currentSecond = 0;
let keyPressed = 0;
const canvasWidth = 1000;
const canvasHeight = 600;


function setup() {
    /*for (let i = 0; i < 100; i++) {
        ratingPerSecond[i] = Math.floor(Math.random() * 10); // Beispieldaten
    }*/    
    for (let i = 0; i < 100; i++) {       
        locationPerSecond[i] = rangePerSecond * i + 25;
    }
    frameRate(20);
}

function draw() {
    noFill();
    beginShape();
    for (let i = 0; i <= currentSecond; i++) {
        vertex(locationPerSecond[i], lineHeightArray[10 - ratingPerSecond[i]]);
    }
    endShape();

    Timer = Timer + 3;
    if (Timer === 60) {
        currentSecond++;
        if (currentSecond >= durationInSeconds) noLoop();            
        if (ratingPerSecond[currentSecond] == null) ratingPerSecond[currentSecond] = ratingPerSecond[currentSecond-1];
        Timer = 0;
    }
}


function startButtonClick(button) {         // creating the canvas, setting the size and position
    let cnv = createCanvas(canvasWidth, canvasHeight);
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2 + 70;
    cnv.position(x, y);
    background(240);
    button.style.display = 'none';
    initalDrawingParseMode(cnv);
}

function initialDrawing(cnv) {              // drawing the basic diagramm  
    strokeWeight(5);
    stroke('rgba(20%,20%,20%,0.1)');
    for (let i = 0; i < 10; i++) {
        lineHeightArray[i] = cnv.height / 11 * (i+1);
        line(25, lineHeightArray[i], width - 25, lineHeightArray[i]);
      }
    
}

function initalDrawingParseMode(cnv) {
    strokeWeight(5);
    stroke('rgba(20%,20%,20%,0.1)');
    for (let i = 0; i < 10; i++) {
        lineHeightArray[i] = cnv.height / 11 * (i+1);
        line(width / 2 - 150, lineHeightArray[i], width, lineHeightArray[i]);
      }
}

document.addEventListener('keydown', function(event) {
    
    keyPressed = event.key;
  
    if (/^\d$/.test(keyPressed)) {      // checking if key is a number
      if (ratingPerSecond[currentSecond+1] == null) {
        ratingPerSecond[currentSecond+1] = keyPressed;
        if (keyPressed == 0) {
            ratingPerSecond[currentSecond+1] = 10;
      }
    }
    }
}
);