
  $(document).ready(
    function() {
      $('.menu-toggle').click(function() {
        $('nav').toggleClass('active')
      })

      $('ul li').click(function() {
        $(this).siblings().removeClass('active');
        $(this).toggleClass('active');
      })
    }
  )



let centerX = [], centerY = [];

let radius = 45, rotAngle = -90;
let accelX = [], accelY = [];
let deltaX = 0.0, deltaY = 0.0;
let springing = 0.0009, damping = 0.98;

//Количество углов
let nodes = 50;

let nodeStartX = [];
let nodeStartY = [];
let nodeX = [];
let nodeY = [];
let angle = [];
let frequency = [];

// Скругление
let organicConstant = 1.0;

function setup() {
createCanvas(windowWidth, windowHeight);

for (let N = 0; N < 10; N++) {

//Расположить по центру
centerX[N] = random(0,width);
centerY[N] = height / 2;
accelX[N] = 0.;
accelY[N] = 0.;
nodeStartX[N] = [];
nodeStartY[N] = [];
nodeX[N] = [];
nodeY[N] = [];
angle[N] = [];
frequency[N] = [];

//Обозначить вершины
for (let i = 0; i < nodes; i++){
nodeStartX[N][i] = 0;
nodeStartY[N][i] = 0;
nodeX[N][i] = 0;
nodeY[N][i] = 0;
angle[N][i] = 0;
}

// Искажение углов
for (let i = 0; i < nodes; i++){
frequency[N][i] = random(5, 12);
}

}


noStroke();
frameRate(30);
}

function draw() {
//Закрыть хвост фигуры
fill(0, 100);
rect(0, 0, width, height);
drawShape();
moveShape();
}



function drawShape() {

for (let N = 0; N < 10; N++) {

//  Расположить фигуры по кругу
for (let i = 0; i < nodes; i++){
nodeStartX[N][i] = centerX[N] + cos(radians(rotAngle)) * radius;
nodeStartY[N][i] = centerY[N] + sin(radians(rotAngle)) * radius;
rotAngle += 360.0 / nodes;
}

// Нарисовать многоугольник
curveTightness(organicConstant);
fill(255);
beginShape();
for (let i = 0; i < nodes; i++){
curveVertex(nodeX[N][i], nodeY[N][i]);
}
endShape(CLOSE);

}
}

function moveShape() {
for(N=0; N < 10; N++){
//Расположить по кругу
deltaX = mouseX - centerX[N] + sin(N / 10 * 2 * 3.14) * 3 * radius;
deltaY = mouseY - centerY[N] + cos(N / 10 * 2 * 3.14) * 3 * radius;

// Пружина
deltaX *= springing;
deltaY *= springing;
accelX[N]+= deltaX;
accelY[N] += deltaY;

centerX[N] += accelX[N];
centerY[N] += accelY[N];

accelX[N] *= damping;
accelY[N] *= damping;

organicConstant = 1 - ((abs(accelX[N]) + abs(accelY[N])) * 0.1);

// Подвинуть вершины
for (let i = 0; i < nodes; i++){
nodeX[N][i] = nodeStartX[N][i] + sin(radians(angle[N][i])) * (accelX[N] * 2);
nodeY[N][i] = nodeStartY[N][i] + sin(radians(angle[N][i])) * (accelY[N] * 2);
angle[N][i] += frequency[N][i];
}
}
}

function windowResized() {
resizeCanvas(windowWidth, windowHeight);
radius = windowWidth/10;
}
