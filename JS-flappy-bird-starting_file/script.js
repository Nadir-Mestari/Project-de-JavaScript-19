const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "./media/flappy-bird-set.png";

let Gameplyer = false;
const gravity = 0.43;
const speed = 3.2;
const size = [51, 36];
const jumpe = -11.5;
const cTenth = (canvas.width / 10);


const pipeWidth = 78
const pipeGape = 270
const pipeLoc = () => (Math.random() * ((canvas.height - (pipeGape + pipeWidth)) - pipeWidth)) + pipeWidth;


let index = 0,
    bestScore = 0,
    currentScore = 0,
    pipes = [],
    flight,
    flyHeight;

const setup = () => {
    currentScore = 0
    flight = jumpe
    flyHeight = (canvas.height / 2) - (size[1] / 2)

    pipes = Array(3).fill().map((a, i) => [canvas.width + (i * (pipeGape
        + pipeWidth)), pipeLoc()]);
    console.log(pipes)
}

const render = () => {
    index++;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width), 0, canvas.width, canvas.height)

    if (Gameplyer) {

        ctx.drawImage(img, 432, Math.floor((index % 9 / 3)) * size[1], ...size, cTenth, flyHeight, ...size);
        flight += gravity
        flyHeight = Math.min(flyHeight + flight, canvas.height - size[1])

    } else {


        ctx.drawImage(img, 432, Math.floor((index % 9 / 3)) * size[1], ...size, ((canvas.width / 2) - size[0] / 2), flyHeight, ...size);
        flyHeight = (canvas.height / 2) - (size[1] / 2);


        ctx.fillText(`Cliquer pour jouer`, 55, 545)
        ctx.fillText(`Meilleur score : ${bestScore}`, 55, 245)
        ctx.font = "bold 30px courier"


    }


    if (Gameplyer) {
        pipes.map(pipe => {
            pipe[0] -= speed

            ctx.drawImage(img, 432, 588 - pipe[1], pipeWidth, pipe[1], pipe[0], 0, pipeWidth, pipe[1])


            ctx.drawImage(img, 432 + pipeWidth, 108, pipeWidth, canvas.height - pipe[1] + pipeGape, pipe[0], pipe[1] + pipeGape, pipeWidth, canvas.height - pipe[1] + pipeGape)

            if (pipe[0] <= -pipeWidth) {
                currentScore++;
                bestScore = Math.max(bestScore, currentScore)

                pipes = [...pipes.slice(1), [pipes[pipes.length - 1][0] + pipeGape + pipeWidth, pipeLoc()]]
                console.log(pipes)



            }
            if ([
                pipe[0] <= cTenth + size[0],
                pipe[0] + pipeWidth >= cTenth,
                pipe[1] > flyHeight || pipe[1] + pipeGape < flyHeight + size[1]
            ].every(elem => elem)) {
                Gameplyer = false;
                setup();
            }

        })

    }

    document.getElementById('bestScore').innerHTML = `Score : ${bestScore}`;
    document.getElementById('currentScore').innerHTML = `Actuel : ${currentScore}`;

    window.requestAnimationFrame(render);
};

setup();

img.onload = render;


document.addEventListener("click", () => Gameplyer = true)
window.onclick = () => flight = jumpe

