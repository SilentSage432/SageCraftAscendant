const anchorWhisperer = () => {
  const wrapper = document.getElementById("sovereignTerminalWrapper");
  const whisperer = document.querySelector("#whispererConsole:not(.anchored-terminal):not(.no-auto-rehome)");

  if (!wrapper) {
    console.warn("❌ sovereignTerminalWrapper not found.");
    return false;
  }

  if (!whisperer) {
    return false;
  }

  // Remove Snap classes if still applied
  whisperer.classList.remove("snap-pinned", "holo-console");

  // Append it into the wrapper explicitly
  wrapper.appendChild(whisperer);
  whisperer.style.display = "block";
  whisperer.style.opacity = "1";
  whisperer.style.visibility = "visible";

  console.log("✅ Whisperer anchored successfully into sovereignTerminalWrapper.");
  return true;
};

// Try once immediately
if (!anchorWhisperer()) {
  // Set up MutationObserver if initial attempt fails
  const observer = new MutationObserver(() => {
    if (anchorWhisperer()) observer.disconnect();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}