const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const socket = io("https://NAMA-REPLIT.repl.co"); // Ganti sesuai server kamu

let players = {};
let currentPlayer = null;

const images = {
  male: new Image(),
  female: new Image(),
};
images.male.src = 'assets/player_male.png';
images.female.src = 'assets/player_female.png';

// joystick velocity (default)
let joystick = {
  velocity: { x: 0, y: 0 }
};

function selectGender(gender) {
  // Sembunyikan menu pilih gender
  document.getElementById('genderSelector').style.display = 'none';
  canvas.style.display = 'block';
  document.getElementById('chatBox').style.display = 'block';

  // Set current player
  currentPlayer = {
    x: 100,
    y: 100,
    gender: gender
  };

  // Kirim ke server
  socket.emit("newPlayer", currentPlayer);
}

// Menerima data semua player
socket.on("updatePlayers", (serverPlayers) => {
  players = serverPlayers;
});

// Loop utama
function gameLoop() {
  requestAnimationFrame(gameLoop);

  if (!currentPlayer) return; // Tunggu hingga gender dipilih

  // Update posisi
  currentPlayer.x += joystick.velocity.x;
  currentPlayer.y += joystick.velocity.y;

  socket.emit("move", currentPlayer);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let id in players) {
    const p = players[id];
    const img = images[p.gender] || images.male;
    if (img.complete && img.naturalHeight !== 0) {
      ctx.drawImage(img, p.x, p.y, 32, 32);
    }
  }
}

gameLoop(); // Jalankan loop

images.male.onload = () => console.log("Male image loaded");
images.female.onload = () => console.log("Female image loaded");
