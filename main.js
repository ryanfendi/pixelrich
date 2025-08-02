let socket = io("https://NAMA-REPLIT.repl.co"); // Ganti sesuai server kamu
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

let currentPlayer = null;
let players = {};

const images = {
  male: new Image(),
  female: new Image(),
};
images.male.src = 'assets/player_male.png';
images.female.src = 'assets/player_female.png';

function selectGender(gender) {
  document.getElementById('genderSelector').style.display = 'none';
  canvas.style.display = 'block';
  document.getElementById('chatBox').style.display = 'block';

  currentPlayer = {
    x: 100,
    y: 100,
    gender: gender,
  };

  socket.emit("newPlayer", currentPlayer);
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const socket = io("https://NAMA-REPLIT.repl.co"); // Ganti sesuai server kamu

const images = {
  male: new Image(),
  female: new Image(),
};
images.male.src = 'assets/player_male.png';
images.female.src = 'assets/player_female.png';

let currentPlayer = {
  x: 100,
  y: 100,
  gender: prompt("Pilih gender: male / female")?.toLowerCase() === "female" ? "female" : "male",
};

socket.emit("newPlayer", currentPlayer);

let players = {};


let velocity = { x: 0, y: 0 };

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const socket = io("https://1c3cca08-8104-423a-bed7-e7ce5f3adbcb-00-2brvmohad4s73.pike.replit.dev/");

socket.emit("newPlayer", currentPlayer);

let players = {};
let currentPlayer = {
  x: 100,
  y: 100,
  gender: prompt("Pilih gender: male / female")?.toLowerCase() === "female" ? "female" : "male",
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

  // Update posisi berdasarkan joystick
  currentPlayer.x += joystick.velocity.x;
  currentPlayer.y += joystick.velocity.y;

  // Kirim posisi ke server
  socket.emit("move", currentPlayer);

  // Gambar semua pemain
  for (let id in players) {
    let p = players[id];
    let img = images[p.gender] || images.male;
    if (img.complete) {
      ctx.drawImage(img, p.x, p.y, 32, 32);
    }
  }

  requestAnimationFrame(gameLoop);
}
gameLoop();

const joystickBase = document.getElementById("joystickBase");
const joystickThumb = document.getElementById("joystickThumb");

let dragging = false;
let origin = { x: 0, y: 0 };

joystickBase.addEventListener("touchstart", (e) => {
  dragging = true;
  const touch = e.touches[0];
  origin.x = touch.clientX;
  origin.y = touch.clientY;
});

joystickBase.addEventListener("touchmove", (e) => {
  if (!dragging) return;
  const touch = e.touches[0];
  const dx = touch.clientX - origin.x;
  const dy = touch.clientY - origin.y;
  const dist = Math.min(40, Math.sqrt(dx * dx + dy * dy));

  const angle = Math.atan2(dy, dx);
  const x = Math.cos(angle) * dist;
  const y = Math.sin(angle) * dist;

  joystickThumb.style.transform = `translate(${x}px, ${y}px)`;

  velocity.x = Math.round(x / 4);
  velocity.y = Math.round(y / 4);
});

joystickBase.addEventListener("touchend", () => {
  dragging = false;
  velocity.x = 0;
  velocity.y = 0;
  joystickThumb.style.transform = `translate(0, 0)`;
});

let joystick = {
  dragging: false,
  origin: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
};

const joystickBase = document.getElementById("joystickBase");
const joystickThumb = document.getElementById("joystickThumb");

joystickBase.addEventListener("touchstart", (e) => {
  joystick.dragging = true;
  const touch = e.touches[0];
  joystick.origin.x = touch.clientX;
  joystick.origin.y = touch.clientY;
});

joystickBase.addEventListener("touchmove", (e) => {
  if (!joystick.dragging) return;

  const touch = e.touches[0];
  const dx = touch.clientX - joystick.origin.x;
  const dy = touch.clientY - joystick.origin.y;
  const dist = Math.min(40, Math.sqrt(dx * dx + dy * dy));
  const angle = Math.atan2(dy, dx);

  const x = Math.cos(angle) * dist;
  const y = Math.sin(angle) * dist;

  joystickThumb.style.transform = `translate(${x}px, ${y}px)`;
  joystick.velocity.x = x / 5;
  joystick.velocity.y = y / 5;
});

joystickBase.addEventListener("touchend", () => {
  joystick.dragging = false;
  joystick.velocity.x = 0;
  joystick.velocity.y = 0;
  joystickThumb.style.transform = `translate(0px, 0px)`;
});





