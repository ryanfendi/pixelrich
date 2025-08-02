const chatInput = document.getElementById("chatInput");
const messages = document.getElementById("messages");

chatInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    socket.emit("chat", chatInput.value);
    chatInput.value = "";
  }
});

socket.on("chat", (msg) => {
  const div = document.createElement("div");
  div.textContent = msg;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});
