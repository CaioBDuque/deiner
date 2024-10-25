const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Carregar imagens
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = 'images/bird.png';
bg.src = 'images/bg.png';
fg.src = 'images/fg.png';
pipeNorth.src = 'images/pipeNorth.png';
pipeSouth.src = 'images/pipeSouth.png';

// Variáveis
let gap = 85;
let constant;
let bX = 10;
let bY = 150;
let gravity = 1.5;
let score = 0;

// Posições dos canos
let pipe = [];
pipe[0] = { x: canvas.width, y: 0 };

// Controle do pássaro
document.addEventListener('keydown', moveUp);

function moveUp() {
    bY -= 25;
}

// Desenhar
function draw() {
    ctx.drawImage(bg, 0, 0);

    // Atualizar a constante para a altura dos canos
    constant = pipeNorth.height + gap;

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if (pipe[i].x === 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        // Detectar colisão
        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && 
            (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || 
            bY + bird.height >= canvas.height - fg.height) {
            location.reload(); // Recarregar a página
        }

        if (pipe[i].x === 5) {
            score++;
        }
    }

    ctx.drawImage(fg, 0, canvas.height - fg.height);
    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}

draw();
