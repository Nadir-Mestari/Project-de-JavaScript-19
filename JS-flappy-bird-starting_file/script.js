const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "./media/flappy-bird-set.png";

let Gameplyer = false;
const gravity = 0.5;
const speed = 6.2;
const size = [51, 36];
const jumpe = -11.5;
const cTenth = (canvas.width / 10);

let index = 0,
    bestScore = 0,
    currentScore = 0,
    pipes = [],
    flight,
    flyHeight;

const render = () => {
    index++;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width), 0, canvas.width, canvas.height)

    if (Gameplyer) {

        ctx.drawImage(img, 432, Math.floor((index % 9 / 3)) * size[1], ...size, cTenth, flyHeight, ...size);

    } else {


        ctx.drawImage(img, 432, Math.floor((index % 9 / 3)) * size[1], ...size, ((canvas.width / 2) - size[0] / 2), flyHeight, ...size);
        flyHeight = (canvas.height / 2) - (size[1] / 2);


        ctx.fillText(`Cliquer pour jouer`, 55, 545)
        ctx.fillText(`Meilleur score : ${bestScore}`, 55, 245)
        ctx.font = "bold 30px courier"


    }

    window.requestAnimationFrame(render);
};

img.onload = render;

document.addEventListener("click", () => Gameplyer = true)

