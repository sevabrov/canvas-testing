var canvas = document.querySelector('canvas');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext('2d');

//Rect
// c.fillStyle = 'rgba(255,0,0,0.7)'
// c.fillRect(100, 100, 20, 50)

//Line
// c.beginPath();
// c.moveTo(100, 200);
// c.lineTo(50, 300);
// c.lineTo(300, 400);
// c.strokeStyle = 'rgba(0,255,0,0.7)';
// c.stroke();

//Arc or circle
// c.beginPath();
// c.arc(window.innerWidth / 2 - 50, window.innerHeight / 2 - 50, 100, 0, Math.PI * 2, false);
// c.strokeStyle = 'violet';
// c.stroke();

//Animation

var mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
})

window.addEventListener('resize', function () {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    init();
})

function Circle(x, y, dx, dy, radius, fillStyle) {
    this.x = x;
    this.dx = dx;
    this.y = y;
    this.dy = dy;
    this.radius = radius;
    this.fillStyle = fillStyle;
    this.minRadius = radius;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.shadowBlur = 20;
        c.shadowColor = "rgba(0,0,0,0.7)";
        c.fillStyle = this.fillStyle;
        c.fill();
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 80 && mouse.x - this.x > -80 &&
            mouse.y - this.y < 80 && mouse.y - this.y > -80) {
            if (this.radius < 60) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

var circleArray = [];

function init() {
    circleArray = [];
    for (var i = 0; i < 350; i++) {
        var
            radius = (Math.floor(Math.random() * 15) + 1),
            x = (Math.random() * (innerWidth - radius * 2)) + radius,
            dx = (Math.random() - 0.5) * 6,
            y = (Math.random() * (innerHeight - radius * 2)) + radius,
            dy = (Math.random() - 0.5) * 6,
            fillStyle = ''; //rgba(0,'+(Math.floor(Math.random()*125)+120) +',0,0.6)
    
        if (i % 2 == 0) {
            fillStyle = 'tomato'
        } else if (i % 3 == 0) {
            fillStyle = '#333';
        } else {
            fillStyle = '#ccc';
        }
    
        circleArray.push(new Circle(x, y, dx, dy, radius, fillStyle));
    }
}


function animation() {
    requestAnimationFrame(animation);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();

    }
}

animation();
init();
