const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');;
const div = document.getElementById('score');
const time = 150;
var dir, points, snake, fruits;

function go() {
    points = 0;
    dir = "right";
    snake = [
        { x: 10, y: 10 },
        { x: 20, y: 10 },
        { x: 30, y: 10 }
    ];
    makefruit();
}
go();
document.addEventListener('keydown', function(e) {
    var key = e.keyCode;
    if (key === 40 && dir != 'up') {
        dir = 'down';
    } else if (key === 39 && dir != 'left') {
        dir = 'right';
    } else if (key === 37 && dir != 'right') {
        dir = "left";
    } else if (key === 38 && dir != 'down') {
        dir = 'up';
    }
})

function makefruit() {
    ctx.fillStyle = "#FF0000";
    var fx = Math.floor(Math.random() * 20);
    var fy = Math.floor(Math.random() * 15);
    fruit = { x: fx, y: fy };

}

function add() {
    var lastbody = snake[snake.length - 1];
    if (dir == 'down') {
        snake.push({ x: lastbody.x, y: lastbody.y + 10 });
    } else if (dir == 'right') {
        snake.push({ x: lastbody.x + 10, y: lastbody.y });
    } else if (dir == 'left') {
        snake.push({ x: lastbody.x - 10, y: lastbody.y });
    } else if (dir == 'up') {
        snake.push({ x: lastbody.x, y: lastbody.y - 10 });
    }
}

function ani() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.shift();
    var ln = snake.length;
    add();
    var lastbody = snake[snake.length - 1];
    for (var i = 0; i <= ln; i++) {
        var body = snake[i];
        ctx.fillStyle = "#7CEE31";
        if (body.x > canvas.width) {
            body.x = 0;
        } else if (body.y > canvas.height) {
            body.y = 0;
        } else if (body.y < 0) {
            body.y = canvas.height;
        } else if (body.x < 0) {
            body.x = canvas.width;
        }
        if (body.x == lastbody.x && body.y == lastbody.y && i < ln - 2) {
            alert('Game over! You get ' + points + ' points');
            go();
        }
        ctx.fillRect(body.x, body.y, 8, 8);
    }
    if (body.x == fruit.x * 10 && body.y == fruit.y * 10) {
        points += 1;
        add();
        makefruit();
    };
    ctx.fillRect(fruit.x * 10, fruit.y * 10, 8, 8);
    div.innerHTML = "Points: " + points;
}
ani();
setInterval(ani, time);