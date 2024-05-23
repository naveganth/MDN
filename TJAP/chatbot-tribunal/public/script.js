let botFirstMessageSent = false;
const BASE_URL = "http://localhost:3000"; 

function toggleChat() {
    const chatBox = document.getElementById("chatBox");
    if (chatBox.style.display === "none" || chatBox.style.display === "") {
        chatBox.style.display = "flex";
        if (!botFirstMessageSent) {
            setTimeout(() => {
                sendBotMessage("Olá! Meu nome é Japinho e estou aqui para responder suas perguntas.");
                botFirstMessageSent = true;
            }, 1000);
        }
    } else {
        chatBox.style.display = "none";
    }
}

async function sendMessage() {
    const userMessage = document.getElementById("userMessage").value;
    if (userMessage.trim() !== "") {
        addMessageToChat(userMessage, "user");
        document.getElementById("userMessage").value = "";

        try {
            const response = await fetch(`${BASE_URL}/chat/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text: userMessage })
            });
            const data = await response.json();
            sendBotMessage(data.response);
        } catch (error) {
            console.error("Error sending message:", error);
            sendBotMessage("Desculpe, houve um erro ao processar sua mensagem.");
        }
    }
}

function sendBotMessage(message) {
    addMessageToChat(message, "bot");
}

function addMessageToChat(message, sender) {
    const chatContent = document.getElementById("chatContent");
    const messageElement = document.createElement("div");

    const icons = {
        user: '<img src="/icons/usuario.svg" alt="User Icon" class="user-message-icon">',
        bot: '<img src="/icons/robo.svg" alt="Bot Icon" class="bot-message-icon">'
    };

    messageElement.className = `chat-message ${sender}-message`;
    messageElement.innerHTML = `${icons[sender]}<div class="message-content">${message}</div>`;
    chatContent.appendChild(messageElement);
    chatContent.scrollTop = chatContent.scrollHeight;
}
