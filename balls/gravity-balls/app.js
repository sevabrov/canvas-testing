var canvas = document.querySelector('#canvas');

canvas.height = innerHeight;
canvas.width = innerWidth;

c = canvas.getContext('2d');

var ballArray = [],
    colorArray = ['#3D9970', '#39CCCC', '#FF4136', '#85144b', '#FF851B'],
    gravity = 0.2,
    friction = 0.98;

function randomPosition(min, max) {
    return Math.floor((Math.random() * (max - min + 1) + min));
}

function Ball(x, y, radius, color, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dy = dy;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.shadowBlur = 20;
        c.shadowColor = 'rgba(0,0,0,0.8)';
        c.fill();
    }
    this.update = function() {   
        if(this.y + this.radius + this.dy >= innerHeight) {
            this.dy = -this.dy;
			this.dy = this.dy * friction;
        } else this.dy += gravity;
        this.y += this.dy;  
        this.draw();      
    }
}

for(var i = 0; i < 100; i++) {
    ballArray.push(new Ball(randomPosition(20, innerWidth-20),
                            randomPosition(20, innerHeight-20),
                            20, 
                            colorArray[randomPosition(0, colorArray.length-1)],
                            3))   
                            ballArray[i].update();
}

function animation() {
    requestAnimationFrame(animation);
    c.clearRect(0,0,innerWidth, innerHeight);
    for(var i = 0; i<ballArray.length; i++) {
        ballArray[i].update();
    }
}
animation();



