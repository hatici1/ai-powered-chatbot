function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");
    
    if (userInput.trim() === "") return;
    
    // Append user message
    let userMessage = document.createElement("div");
    userMessage.textContent = "You: " + userInput;
    chatBox.appendChild(userMessage);
    
    // Clear input field
    document.getElementById("user-input").value = "";
    
    // Send message to Flask backend
    fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        let botMessage = document.createElement("div");
        botMessage.textContent = "Bot: " + data.response;
        chatBox.appendChild(botMessage);
    })
    .catch(error => console.error("Error:", error));
}