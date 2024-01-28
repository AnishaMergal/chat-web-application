document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    const chatOutput = document.getElementById('chat-output');
    const messageInput = document.getElementById('message-input');

    function appendMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = sender === 'me' ? 'message me' : 'message';
        messageElement.innerText = message;
        chatOutput.appendChild(messageElement);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    function sendMessage() {
        const message = messageInput.value;
        if (message.trim() !== '') {
            appendMessage(`You: ${message}`, 'me');
            socket.emit('chat message', message);
            messageInput.value = '';
        }
    }

    socket.on('chat message', (message) => {
        appendMessage(`Stranger: ${message}`);
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
