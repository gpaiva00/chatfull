var socket = io('http://localhost:3000');
const chat = document.getElementById('chat');
var authorEl = document.getElementById('username');
var messageEl = document.getElementById('message');
var messagesDiv = document.querySelector('.messages');

chat.addEventListener('submit', handleSubmit);

socket.on('receivedMessage', message => {
  renderMessage(message);
});

socket.on('previousMessages', messages => {
  for (message of messages) {
    renderMessage(message);
  }
})


function handleSubmit(e) {
  e.preventDefault();

  const author = authorEl.value;
  const message = messageEl.value;
  
  if (author.length && message.length) {
    const messageObject = {
      author,
      message
    };

    renderMessage(messageObject);

    socket.emit('sendMessage', messageObject);
  }
  
}

function renderMessage({ author, message }) {
  const messageTemplate = `<strong>${author}</strong>: ${message}`;
  const divEl = document.createElement('div');
  divEl.innerHTML = messageTemplate;

  messagesDiv
  .appendChild(divEl);
}