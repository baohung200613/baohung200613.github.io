// Connect to the server
const socket = new WebSocket("ws://6a9.strangled.net:19132");

const button = document.getElementById("MessageSend")
const messageBar = document.getElementById("ChatBar")

const userName = "Anonymous"

// When connection opens
socket.onopen = () => {
  console.log("Connected!");
  
  button.addEventListener("click", function() {
    if (messageBar.value.trim() == "") {return} 
    message = messageBar.value.trim()
    socket.send(JSON.stringify({"user":userName, "message":message}))
    messageLine = document.createElement('div')
    messageLine.textContent = userName + ": " + message

    document.getElementById("chat-box").appendChild(messageLine)
  })

};

// When message received
socket.onmessage = (event) => {
  message = event.data
  message = JSON.parse(message)

  messageLine = document.createElement('div')
  messageLine.textContent = message['user'] + ": " + message['message']

  document.body.appendChild(messageLine)
};

// When connection closes
socket.onclose = () => {
  console.log("Disconnected.");
};

// When there's an error
socket.onerror = (error) => {
  console.log("Error:", error);
};

