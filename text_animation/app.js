var canvas = document.querySelector('canvas');

canvas.height = window.innerHeight - 40;
canvas.width = window.innerWidth;

var c = canvas.getContext('2d');



//Text animation
c.fillStyle = 'tomato'
var txt = '',
    txtArray = [];


var drawLetter = function (x, y, txt) {
    this.x = x;
    this.y = y;
    this.txt = txt;
    c.font = Math.floor(Math.random() * 10 + 6) + 'em Arial';
    c.fillText(this.txt[this.txt.length-1], this.x, this.y);
}

var update = function () {
    txt = document.querySelector('input[name=txt]').value;    
    var x = Math.floor((Math.random() * (innerWidth - 50 * 2)) + 50),
        y = Math.floor((Math.random() * (innerHeight - 100 * 2)) + 100);

        drawLetter(x, y, txt);

};

var compile = function () {
    c.clearRect(0, 0, innerWidth, innerHeight);    
    c.fillText=("txt", 200, 200);
    c.font = '16em Arial';
    c.fillStyle = 'red';
    console.log(txt)
};