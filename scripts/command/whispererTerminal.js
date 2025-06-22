const inputField = document.getElementById("whispererInput");
const display = document.getElementById("whispererDisplay");

function typeResponse(text, delay = 40) {
    let i = 0;
    const span = document.createElement("div");
    span.className = "whisperer-line";
    display.appendChild(span);
    display.scrollTop = display.scrollHeight;

    function typeChar() {
        if (i < text.length) {
          span.textContent += text.charAt(i);
          i++;
          setTimeout(typeChar, delay);
        }
      }
    
      typeChar();
    }

function respondToUser(command) {
  const responseMap = {
    hello: "Greetings, Operator.",
    help: "Available commands: hello, help, status",
    status: "All systems nominal. Awaiting next directive.",
  };

  const response = responseMap[command.toLowerCase()] || "Unrecognized command. Type 'help' for options.";
  typeResponse(response);
}

inputField?.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputField.value.trim() !== "") {
    const userInput = inputField.value.trim();
    inputField.value = "";
    inputField.focus();

    const userLine = document.createElement("div");
    userLine.className = "operator-line";
    userLine.textContent = `> ${userInput}`;
    display.appendChild(userLine);
    display.scrollTop = display.scrollHeight;

    respondToUser(userInput);
  }
});