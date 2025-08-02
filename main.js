const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const socket = io("https://1c3cca08-8104-423a-bed7-e7ce5f3adbcb-00-2brvmohad4s73.pike.replit.dev/");

let players = {};
let currentPlayer = {
  x: 100,
  y: 100,
  gender: prompt("Pilih gender: male / female") || "male",
};

const images = {
  male: new Image(),
  female: new Image(),
};
images.male.src = 'assets/player_male.png';
images.female.src = 'assets/player_female.png';

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") currentPlayer.x += 5;
  if (e.key === "ArrowLeft") currentPlayer.x -= 5;
  socket.emit("move", currentPlayer);
});

socket.emit("newPlayer", currentPlayer);

socket.on("updatePlayers", (serverPlayers) => {
  players = serverPlayers;
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let id in players) {
    let p = players[id];
    let img = images[p.gender] || images.male;
    ctx.drawImage(img, p.x, p.y, 32, 32);
  }
  requestAnimationFrame(gameLoop);
}

gameLoop();

