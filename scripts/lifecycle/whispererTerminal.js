const inputField = document.getElementById("whispererInput");
const display = document.getElementById("whispererDisplay");

function typeResponse(text, delay = 40) {
  let i = 0;
  const span = document.createElement("div");
  span.className = "whisperer-line";
  display.appendChild(span);

  function typeChar() {
    if (i < text.length) {
      span.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, delay);
    }
  }

  typeChar();
}

inputField?.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputField.value.trim() !== "") {
    const userInput = inputField.value.trim();
    inputField.value = "";

    const userLine = document.createElement("div");
    userLine.className = "operator-line";
    userLine.textContent = `> ${userInput}`;
    display.appendChild(userLine);

    // Simulated response for now
    setTimeout(() => {
      typeResponse("Acknowledged. Initializing directive...");
    }, 500);
  }
});
