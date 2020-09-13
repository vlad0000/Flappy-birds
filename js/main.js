const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

let bird = new Image(),
  bg = new Image(),
  fg = new Image(),
  pipeUp = new Image(),
  pipeBottom = new Image();

let btn = document.querySelector('.jump')

let gap = 90,
    pipe = [];  
pipe[0] = {
    x: cvs.width,
    y: 0,
    }

let birdX = 20,
  birdY = cvs.height - Math.floor(cvs.height / 2),
  grav = 1;


bird.src = 'img/flappy_bird_bird.png';
bg.src = 'img/flappy_bird_bg.png';
fg.src = 'img/flappy_bird_fg.png';
pipeUp.src = 'img/flappy_bird_pipeUp.png';
pipeBottom.src = 'img/flappy_bird_pipeBottom.png';

function jump() {
  birdY -= 30;
}
btn.onclick = jump;
document.addEventListener('keydown', jump)

function gameDraw() {
  
  ctx.drawImage(bg, 0, 0);
  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
    pipe[i].x--;
    
    if (pipe[i].x == 100) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
      });
      console.log('Элемент добавлен успешно');
    }
    if (pipe[i].x < 0) {
      pipe.shift()
      console.log('Элемент удален успешно');
    }
  }
  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, birdX, birdY)
  birdY += grav;
  requestAnimationFrame(gameDraw)
}
console.log();
pipeBottom.onload = gameDraw;