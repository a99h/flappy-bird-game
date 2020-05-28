let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let bird = new Image();
let bg = new Image();
let bottom = new Image();
let pipeUp = new Image();
let pipeDown = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
bottom.src = "img/bottom.png";
pipeUp.src = "img/pipeUp.png";
pipeDown.src = "img/pipeDown.png";

let gap = 90;

let xPos = 10;
let yPos = 150;
let grav = 1.5;

let bestScore=0;
let score = 0;

let flyAudio = new Audio();
let scoreAudio = new Audio();

flyAudio.src = "audio/fly.mp3";
scoreAudio.src = "audio/score.mp3"

let pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
}

function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y+ pipeUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x == 50) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }

        if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
            || yPos + bird.height >= cvs.height - bottom.height) {
                if (score > bestScore) bestScore = score;
                location.reload();
        }
            
        if (pipe[i].x == 5) {
            score++;
            scoreAudio.play();
        }
    }

    ctx.drawImage(bottom, 0, bg.height - bottom.height);
    ctx.drawImage(bird, xPos, yPos);
    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);
    ctx.fillText("Best: " + bestScore, 100, cvs.height - 20)

    requestAnimationFrame(draw);
}

function moveUp() {
    yPos -= 20;
    flyAudio.play();
}

pipeDown.onload = draw;

document.addEventListener("keydown", function(event){
    if (event.keyCode == 32) moveUp();
});