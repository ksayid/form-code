let w = window.innerWidth;
let h = window.innerHeight;
let tadpoles = [];
let NUM_TADPOLES = 1;

class Tadpole {
    
    constructor() {
        this.t = random(10000); // time
        this.param = random(100); // random num (so each tadpole is different)
        // when val (param in update) is low, particles go along a diagonal.
        // this controls which diagonal (/ or \)
        this.diag = random();
        this.prev = []; // stores past positions
        this.color = [Math.floor(random(0, 255)),
                      Math.floor(random(0, 255)),
                      Math.floor(random(0, 255))];

        
        for (let i = 0; i < 10; i ++) {
            this.prev.push({x: 0, y: 0});
        }
    }
    
    update(val) {
        // https://p5js.org/reference/#/p5/noise
        let x_pos = noise(this.t + this.param) * width;
        let y_pos = noise(this.t + this.param + val) * height;
        
        if (this.diag >= 0.5) this.pos = createVector(x_pos, y_pos);
        else this.pos = createVector(x_pos, height - y_pos);
		
        this.t = this.t + 0.005;
	}
    
    display() {
        // Eye/Head of Tadpole
		fill(0);
		ellipse(this.pos.x, this.pos.y, 4, 4);

		// Tail of Tadpole
        for (let i = 9; i > 0; i--) {
			this.prev[i].x = this.prev[i - 1].x;
			this.prev[i].y = this.prev[i - 1].y;
			fill(this.color[0], this.color[1], this.color[2], 10);
			ellipse(this.prev[i].x, this.prev[i].y, 14 - i, 14 - i);
		}
		this.prev[0].x = this.pos.x;
		this.prev[0].y = this.pos.y;
	}
}

function setup() {
    createCanvas(w, h);
    randSlider = createSlider(0, 50, 25);
    randSlider.position(10, 10);
    randSlider.style('width', '80px');
	
    opacitySlider = createSlider(0, 70, 30, 10);
    opacitySlider.position(10, 30);
    opacitySlider.style('width', '80px');
    
    bgSlider = createSlider(1, 3, 2, 1);
    bgSlider.position(10, 50);
    bgSlider.style('width', '80px');
    
    for (let i = 0; i < NUM_TADPOLES; i++) {
		tadpoles.push(new Tadpole());
	}
	noStroke();
}

function mouseClicked() {
    tadpoles.push(new Tadpole());
    NUM_TADPOLES++;
}


function draw() {
    let opacityVal = opacitySlider.value();
    let directionVal = randSlider.value() / 100;
    let bgVal = bgSlider.value();
    
    if (bgVal == 1) background(0, 0, 0, opacityVal);
    else if (bgVal == 2) background(212, 241, 249, opacityVal);
    else background(255, 255, 255, opacityVal);
    
	for (let i = 0; i < NUM_TADPOLES; i++) {
		tadpoles[i].update(directionVal);
		tadpoles[i].display();
	}
}


