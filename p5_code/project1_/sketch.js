currentkey = '1';
bgc ;
gkcount;



function setup() {
  createCanvas(900,700);
  background(0);
  smooth();
  bgc = color(0);
  gkcount = 20;
}

function draw() {
  if( keyIsPressed) {
    clear_print();
  }

 if (mouseIsPressed){
  drawChoice();
 }
}

function drawChoice(){
  let currentkey = key;

  switch(currentkey) {
    case '1':
      console.log("1");  // yellow line 
      drawline(color(255, 244, 69), mouseX, mouseY, pmouseX, pmouseY);
      break;
   
    case '2':
      console.log("2");  // purple line
      livFeltMarker(fill(191, 119, 255,50), mouseX, mouseY, pmouseX, pmouseY);
      break;

    case '3':
      console.log("3");  // green line
      livWiggleLine(stroke(81, 254, 73), mouseX, mouseY, pmouseX, pmouseY);
      break;

    case '4':
      console.log("4");  // calligraphy pen
      livCaligPen(color(254, 130, 73), mouseX, mouseY, pmouseX, pmouseY);
      break;

    case '5':
      console.log("5");  // erase with bg color
      eraser(bgc,mouseX, mouseY,25);
       break;

    case '6':
        console.log("6");  // rainbow stroke
        livRainbowStroke(mouseX, mouseY, pmouseX, pmouseY);
        if (gkcount > 50 ) {
            gkcount = 1;
        } else {
            gkcount+= .5;
        }
     break;
     
    
    default:             // Default executes if the case labels
      console.log("None");   // don't match the switch parameter
      break;
    }
}

function livFeltMarker(k,  lx, ly,  px, py) {
    noStroke();
    circle(mouseX, mouseY, 50);
  }

  function livWiggleLine(k,  lx, ly,  px, py) {
    strokeWeight(2);
    noFill();
    const distance = dist(mouseX, mouseY, pmouseX, pmouseY)
    const midX = (mouseX + pmouseX) / 2
    const midY = (mouseY + pmouseY) / 2
    const angle = Math.atan2(mouseY - pmouseY, mouseX - pmouseX)
    const flip = (frameCount % 2) * PI
    arc(midX, midY, distance, distance, angle + flip, angle + PI + flip)
  }


function livCaligPen(k,  lx, ly,  px, py) {
    stroke(255, 119, 119);
    strokeWeight(1);
    const width = 5
    const lerps = 16
  
    for (let i = 0; i <= lerps - 1; i++) {
  
      const x = lerp(mouseX, pmouseX, i / lerps)
      const y = lerp(mouseY, pmouseY, i / lerps)
  
      line(x - width, y - width, x + width, y + width)
    }
  }

function livRainbowStroke(k,  lx, ly,  px, py) {
    const hue = (frameCount * 10) % 360;

   
    const hsbaColor = color(`hsba(${hue}, 100%, 100%, 0.6)`);
    fill(hsbaColor);
    noStroke();
    const distance = dist(mouseX, mouseY, pmouseX, pmouseY);
    const midX = (mouseX + pmouseX) / 2;
    const midY = (mouseY + pmouseY) / 2;
    circle(midX, midY, distance);

}


  function drawline( k,  lx, ly,  px, py) {
    strokeWeight(1); 
    stroke(k);
    line(lx, ly, px, py);
    console.log(mouseX);
    console.log(pmouseX);
  }
  
  

  function eraser( k, lx, ly, sz) {
    fill(k);
    stroke(k);
    ellipse(lx, ly, sz,sz);
  }
  
  function clear_print() {
  
    // these 2 options let you choose between clearing the background
    // and saveing the current image as a file.
    if (key == 'x' || key == 'X') {
      background(0);
    } else if (key == 'p' || key == 'P') {
      saveFrames('image-0', 'png', 1, 1);
      key = '';  // resets the key so it does not make more than one image.
    }
  
  }