const barWidth = 20;
let lastBar = -1;

function setup() {
  createCanvas(800,600);
  colorMode(HSB, height, height, height);
  noStroke();
  background(0);
}

function draw() {
  

  let r = random(50);
  let mx = mouseX;
  let my = mouseY;


  let whichBar = mouseX / barWidth;
  if (whichBar !== lastBar) {
    let barX = whichBar * barWidth;
    fill(mouseY, height, height);
    circle(barX, my, barWidth, height);
    lastBar = whichBar;
  }
  
  
  console.log(mx + " " + r);
  if (mx < width/2)  {
  
    ellipse(mx, my, r * 5, r * 2);
  } else {
    // background(width -m );
    circle(mx, height/2, r * 2, r * 5);
  }

  for (let i = 0; i < 800;  i += 15) {
    for (let j = 0; j < 600; j += 20) {
      rand = random(0);
      fill(rand)
      // fill(rand);
      circle( i+4, j+4, 8, 8 );
      console.log("includes grayscale" + "rainbow spectrum" + rand);
    }

  }

}
