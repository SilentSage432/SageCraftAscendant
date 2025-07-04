// Clean HTML-first logic for Whisperer Terminal
// Ensure script runs after DOM is loaded
import { logMessage } from '../modules/whisperer/logger.js';
import { handleInputSubmission } from '../modules/whisperer/inputHandler.js';
import { toggleVitalsPanel } from '../modules/whisperer/vitalsToggle.js';
import { showErrorFeedback } from '../modules/whisperer/errorFeedback.js';
import { initWhisperer } from '../modules/whisperer/initWhisperer.js';

    const userInput = document.getElementById('whispererInput');
    const chatContainer = document.getElementById('whispererMessageLog');
    const sendButton = document.getElementById('whispererSend');
    const vitalsPanel = document.getElementById('whispererVitals');
    const toggleVitals = document.getElementById('toggleVitals');

    // === Phase 20: Memory Bookmark + Pinning Layer ===
    const pinnedMessages = [];

    const panelReferences = {};

    function rememberPanelReference(tag, panelId) {
        panelReferences[tag] = panelId;
        simulateTypingResponse(`🧭 Remembered panel reference "${tag}" → ${panelId}`);
    }

    function recallPanelReference(tag) {
        const panelId = panelReferences[tag];
        if (panelId) {
            simulateTypingResponse(`📌 Recalling panel "${tag}"...`);
            const targetPanel = document.getElementById(panelId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            } else {
                simulateTypingResponse(`⚠️ Panel "${panelId}" not found.`);
            }
        } else {
            simulateTypingResponse(`❓ No panel reference found for "${tag}".`);
        }
    }

    function pinMessage(messageText, type = 'user') {
        pinnedMessages.push({ message: messageText, type, timestamp: new Date().toISOString() });
        simulateTypingResponse(`📌 Message pinned: "${messageText}"`);
    }

    function showPinnedMessages() {
        if (pinnedMessages.length === 0) {
            simulateTypingResponse('📌 No pinned messages yet.');
            return;
        }

        const formattedPins = pinnedMessages
            .map(entry => `[${entry.type}] ${entry.message}`)
            .join('\n');

        simulateTypingResponse(`📍 Pinned Messages:\n${formattedPins}`);
    }

    // === Phase 7: Command Router + State Action Matrix ===
    const stateActionMatrix = {
      help: () => simulateTypingResponse('🧭 Available Commands: /help, /clear, /log, /vitals'),
      clear: () => {
          chatContainer.innerHTML = '';
          simulateTypingResponse('🧹 Terminal cleared.');
      },
      log: () => {
          const recent = getRecentMemory(5).map(entry => `[${entry.type}] ${entry.content}`).join('\n');
          simulateTypingResponse(`🗂️ Recent Memory:\n${recent}`);
      },
      vitals: () => {
          if (vitalsPanel) {
              vitalsPanel.classList.add('active');
              simulateTypingResponse('📊 Vitals panel activated.');
          }
      },
      remember: () => {
          const recent = whispererMemoryLog.slice().reverse().find(entry => entry.type === 'user');
          if (recent) {
              const parts = recent.content.split('→');
              if (parts.length === 2) {
                  const tag = parts[0].trim();
                  const panelId = parts[1].trim();
                  rememberPanelReference(tag, panelId);
              } else {
                  simulateTypingResponse('❓ Format for /remember is "tag → panelId"');
              }
          } else {
              simulateTypingResponse('📌 No recent message to remember.');
          }
      },
      recall: () => {
          const recent = whispererMemoryLog.slice().reverse().find(entry => entry.type === 'user');
          if (recent) {
              recallPanelReference(recent.content.trim());
          } else {
              simulateTypingResponse('🔍 No reference tag to recall.');
          }
      },
      activate: () => {
          const recent = whispererMemoryLog.slice().reverse().find(entry => entry.type === 'user');
          if (recent) {
              const panelId = recent.content.trim();
              const panel = document.getElementById(panelId);
              if (panel) {
                  panel.classList.add('active');
                  simulateTypingResponse(`🟢 Activated panel: "${panelId}"`);
              } else {
                  simulateTypingResponse(`⚠️ Panel "${panelId}" not found.`);
              }
          } else {
              simulateTypingResponse('❓ No recent panel ID found to activate.');
          }
      }
    };

    // Add command hooks to stateActionMatrix
    stateActionMatrix['pin'] = () => {
        const lastMessage = whispererMemoryLog.slice().reverse().find(entry => entry.type === 'user');
        if (lastMessage) {
            pinMessage(lastMessage.content, lastMessage.type);
        } else {
            simulateTypingResponse('📌 No recent message to pin.');
        }
    };

    stateActionMatrix['pins'] = () => {
        showPinnedMessages();
    };

    // === Phase 22: Directive Stack + Live Intent Queue ===
    const directiveStack = [];
    const intentQueue = [];

    function pushDirective(directive) {
        directiveStack.push({ directive, timestamp: new Date().toISOString() });
        simulateTypingResponse(`🧾 Directive queued: "${directive}"`);
    }

    function processNextDirective() {
        if (directiveStack.length === 0) {
            simulateTypingResponse('📭 No directives in stack.');
            return;
        }
        const { directive } = directiveStack.shift();
        simulateTypingResponse(`📜 Processing directive: "${directive}"`);
        triggerStateResponse(directive);
        handleInternalCommand(directive);
    }

    function showDirectiveStack() {
        if (directiveStack.length === 0) {
            simulateTypingResponse('🧾 No active directives.');
            return;
        }
        const formatted = directiveStack.map(d => `→ ${d.directive}`).join('\n');
        simulateTypingResponse(`📚 Directive Stack:\n${formatted}`);
    }

    function queueIntent(intent) {
        intentQueue.push({ intent, timestamp: new Date().toISOString() });
        simulateTypingResponse(`🎯 Intent received: "${intent}"`);
    }

    function reviewIntentQueue() {
        if (intentQueue.length === 0) {
            simulateTypingResponse('🧠 No live intents recorded.');
            return;
        }
        const formatted = intentQueue.map(i => `• ${i.intent}`).join('\n');
        simulateTypingResponse(`🧠 Live Intent Queue:\n${formatted}`);
    }

    stateActionMatrix['stack'] = () => showDirectiveStack();
    stateActionMatrix['process'] = () => processNextDirective();
    stateActionMatrix['intent'] = () => reviewIntentQueue();

    // Integrate with command parsing
    function handleInternalCommand(command) {
        const action = stateActionMatrix[command.toLowerCase()];
        if (action) {
            action();
        } else if (command.startsWith('intent:')) {
            const intent = command.replace('intent:', '').trim();
            queueIntent(intent);
        } else if (command.startsWith('stack:')) {
            const directive = command.replace('stack:', '').trim();
            pushDirective(directive);
        } else {
            simulateTypingResponse(`❓ Unknown command: "${command}"`);
        }
    }


    // === Phase 3.5: Touch Gesture Layer ===
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    // Tap to focus on input
    chatContainer.addEventListener('click', () => {
        userInput.focus();
    });

    // Long-press anywhere in the terminal to show pinned messages
    let pressTimer;
    chatContainer.addEventListener('touchstart', () => {
        pressTimer = setTimeout(() => {
            showPinnedMessages();
        }, 800);
    });

    chatContainer.addEventListener('touchend', () => {
        clearTimeout(pressTimer);
    });

    // Optional: swipe left/right for future navigation
    chatContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });

    chatContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleGesture();
    });

    function handleGesture() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 50) {
                simulateTypingResponse('👈 Swipe right detected');
            } else if (deltaX < -50) {
                simulateTypingResponse('👉 Swipe left detected');
            }
        } else {
            if (deltaY > 50) {
                simulateTypingResponse('👆 Swipe down detected');
            } else if (deltaY < -50) {
                simulateTypingResponse('👇 Swipe up detected');
            }
        }
    }

    // === Phase 3: Interactive Behavior Rewiring ===
    // Bind terminal-specific key commands
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            stateActionMatrix.clear();
        }
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            stateActionMatrix.log();
        }
    });

    // Whisperer input focus toggler (hotkey: `/`)
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== userInput) {
            e.preventDefault();
            userInput.focus();
        }
    });

    // Panel toggler (Ctrl+`)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === '`') {
            const terminal = document.getElementById("whispererTerminal");
            if (terminal) terminal.classList.toggle('hidden');
        }
    });

    // Send message on button click
    sendButton.addEventListener('click', () => {
        handleSubmit();
    });

    // Send message on Enter (allow Shift+Enter for newlines)
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    });

    // Auto-resize the input as user types
    userInput.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = `${this.scrollHeight}px`;
    });

    // Handle message submission
    function handleSubmit() {
        const messageText = userInput.value.trim();
        if (messageText) {
            const parsedCommand = parseCommand(messageText);
            if (parsedCommand) {
                addMessage(`[${parsedCommand.type.toUpperCase()}] ${parsedCommand.value}`, 'system');
                logMemoryEntry(parsedCommand.type, parsedCommand.value);
                if (parsedCommand.type === 'sigil') {
                    triggerLoreHook(parsedCommand.value);
                } else if (parsedCommand.type === 'command' || parsedCommand.type === 'directive') {
                    triggerStateResponse(parsedCommand.value);
                    handleInternalCommand(parsedCommand.value);
                }
                // Future: route to internal command handler
                userInput.value = '';
                userInput.style.height = 'auto';
                userInput.focus();
                return;
            }
            addMessage(messageText, 'user');
            logMemoryEntry('user', messageText);
            suggestPanelActivation(messageText);

            // Simulated response
            simulateTypingResponse(`🧠 Whisperer received: "${messageText}"`);

            userInput.value = '';
            userInput.style.height = 'auto';
            userInput.focus();
        }
    }

    // Add message to the log
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = text;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Command parser
    function parseCommand(text) {
        if (text.startsWith('/')) {
            return { type: 'command', value: text.slice(1) };
        } else if (text.startsWith('#')) {
            return { type: 'sigil', value: text.slice(1) };
        } else if (text.startsWith('>')) {
            return { type: 'directive', value: text.slice(1) };
        } else if (text.startsWith('@')) {
            return { type: 'target', value: text.slice(1) };
        }
        return null;
    }

    // === Whisperer Memory Kernel ===
    const whispererMemoryLog = [];

    function logMemoryEntry(type, content) {
        const timestamp = new Date().toISOString();
        whispererMemoryLog.push({ timestamp, type, content });

        // Optional: Cap memory size
        if (whispererMemoryLog.length > 200) {
            whispererMemoryLog.shift(); // remove oldest entry
        }
    }

    // === Phase 6: EventBus & Lore Hooks ===
    function dispatchWhispererEvent(type, detail) {
        const event = new CustomEvent(`whisperer:${type}`, { detail });
        document.dispatchEvent(event);
    }

    function triggerLoreHook(tag) {
        dispatchWhispererEvent('lore', { tag });
        console.log(`📖 Lore Hook triggered for: ${tag}`);
    }

    function triggerStateResponse(command) {
        dispatchWhispererEvent('command', { command });
        console.log(`⚙️ Command State triggered: ${command}`);
    }




    function getRecentMemory(limit = 10) {
        return whispererMemoryLog.slice(-limit);
    }

    function clearMemoryLog() {
        whispererMemoryLog.length = 0;
    }

    // Vitals toggle (optional)
    if (toggleVitals && vitalsPanel) {
        toggleVitals.addEventListener('click', () => {
            vitalsPanel.classList.toggle('active');
        });
    }

    // Optional: make addMessage available globally
    window.addMessageToWhisperer = addMessage;

    // Typing simulation engine
    function simulateTypingResponse(fullText, delay = 25) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'system');
        chatContainer.appendChild(messageDiv);

        let index = 0;
        const typingInterval = setInterval(() => {
            messageDiv.textContent = fullText.slice(0, index + 1);
            index++;
            if (index >= fullText.length) {
                clearInterval(typingInterval);
                logMemoryEntry('system', fullText);
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        }, delay);
    }

    // === Phase 8: Feedback Pulse System + Vitals Feedback Hooks ===
    function sendPulseFeedback(type, message) {
        const pulse = document.createElement('div');
        pulse.classList.add('vitals-pulse');
        pulse.dataset.type = type;
        pulse.textContent = message;

        if (vitalsPanel) {
            vitalsPanel.appendChild(pulse);

            setTimeout(() => {
                pulse.classList.add('fade-out');
                pulse.addEventListener('transitionend', () => pulse.remove());
            }, 2200);
        }
    }

    // Hook into memory logging for feedback injection
    const originalLogMemoryEntry = logMemoryEntry;
    logMemoryEntry = function(type, content) {
        originalLogMemoryEntry(type, content);
        if (type === 'user' || type === 'command') {
            sendPulseFeedback(type, content);
        }
    };
    // === Phase 9: Whisperer Status Beacon + System Signal Uplink ===
    const statusBeacon = document.createElement('div');
    statusBeacon.id = 'whispererStatusBeacon';
    statusBeacon.textContent = '⧉ SYSTEM READY';
    document.getElementById("neuralThrone")?.appendChild(statusBeacon);

    function updateStatusBeacon(message, pulse = false) {
        statusBeacon.textContent = `⧉ ${message}`;
        if (pulse) {
            statusBeacon.classList.add('pulse');
            setTimeout(() => statusBeacon.classList.remove('pulse'), 1500);
        }
    }

    // Listen for core Whisperer events
    document.addEventListener('whisperer:command', (e) => {
        updateStatusBeacon(`Command: ${e.detail.command}`, true);
    });

    document.addEventListener('whisperer:lore', (e) => {
        updateStatusBeacon(`Lore Hook: ${e.detail.tag}`, true);
    });

    document.addEventListener('whisperer:status', (e) => {
        updateStatusBeacon(`${e.detail.message}`, true);
    });

    // === Phase 10: Signal Forecast Panel Integration ===
    const forecastPanel = document.getElementById('signalForecastPanel');
    const forecastLog = document.getElementById('signalForecastLog');

    function logForecastSignal(message, level = 'info') {
        if (!forecastPanel || !forecastLog) return;

        const logEntry = document.createElement('div');
        logEntry.classList.add('forecast-entry', `level-${level}`);
        logEntry.textContent = `🔮 ${message}`;

        forecastLog.appendChild(logEntry);
        forecastPanel.classList.add('active');

        setTimeout(() => {
            logEntry.classList.add('fade-out');
            logEntry.addEventListener('transitionend', () => logEntry.remove());
        }, 4000);
    }

    // Sample usage trigger via state actions
    stateActionMatrix['forecast'] = () => {
        logForecastSignal('Signal is steady. No anomalies detected.', 'info');
        simulateTypingResponse('📡 Forecast updated. See signal panel.');
    };

    // Optional: external modules can call this too
    window.logForecastSignal = logForecastSignal;
    // === Phase 11: Modular Action Dispatch + External Trigger Ports ===
    window.WhispererActionPort = {
        dispatch: (actionType, payload = {}) => {
            switch (actionType) {
                case 'message':
                    if (payload.text && payload.sender) {
                        addMessage(payload.text, payload.sender);
                        logMemoryEntry(payload.sender, payload.text);
                    }
                    break;
                case 'simulate':
                    if (payload.text) {
                        simulateTypingResponse(payload.text);
                    }
                    break;
                case 'command':
                    if (payload.command) {
                        triggerStateResponse(payload.command);
                        handleInternalCommand(payload.command);
                    }
                    break;
                case 'lore':
                    if (payload.tag) {
                        triggerLoreHook(payload.tag);
                    }
                    break;
                case 'forecast':
                    if (payload.message) {
                        logForecastSignal(payload.message, payload.level || 'info');
                    }
                    break;
                case 'vitals':
                    if (vitalsPanel) {
                        vitalsPanel.classList.toggle('active');
                    }
                    break;
                default:
                    console.warn(`Unknown Whisperer action: ${actionType}`);
            }
        }
    };

    // Optional: announce that ports are active
    console.log('🔌 Whisperer External Trigger Ports Activated');

    // === Phase 12: Session Save/Load Memory Snapshot Protocol ===
    window.WhispererSessionManager = {
        saveSnapshot: () => {
            try {
                const snapshot = JSON.stringify(whispererMemoryLog);
                localStorage.setItem('whispererMemorySnapshot', snapshot);
                simulateTypingResponse('💾 Session snapshot saved.');
            } catch (e) {
                console.error('Failed to save session snapshot:', e);
                simulateTypingResponse('⚠️ Snapshot save failed.');
            }
        },
        loadSnapshot: () => {
            try {
                const snapshot = localStorage.getItem('whispererMemorySnapshot');
                if (snapshot) {
                    const restored = JSON.parse(snapshot);
                    restored.forEach(entry => {
                        addMessage(`[${entry.type}] ${entry.content}`, entry.type === 'user' ? 'user' : 'system');
                        whispererMemoryLog.push(entry);
                    });
                    simulateTypingResponse('📂 Session snapshot restored.');
                } else {
                    simulateTypingResponse('❓ No saved session found.');
                }
            } catch (e) {
                console.error('Failed to load session snapshot:', e);
                simulateTypingResponse('⚠️ Snapshot load failed.');
            }
        },
        clearSnapshot: () => {
            localStorage.removeItem('whispererMemorySnapshot');
            simulateTypingResponse('🧹 Snapshot cleared from memory.');
        }
    };

    // === Phase 13: Companion Feed + Reactive Memory Trace Logging ===
    const companionFeed = document.createElement('div');
    companionFeed.id = 'companionFeedLog';
    companionFeed.style.display = 'none'; // Toggle visibility via CSS or JS
    companionFeed.style.position = 'fixed';
    companionFeed.style.bottom = '10px';
    companionFeed.style.left = '10px';
    companionFeed.style.background = 'rgba(0,0,0,0.75)';
    companionFeed.style.color = '#fff';
    companionFeed.style.padding = '10px';
    companionFeed.style.borderRadius = '8px';
    companionFeed.style.maxWidth = '300px';
    companionFeed.style.fontSize = '0.85rem';
    companionFeed.style.zIndex = '1000';
    document.getElementById("neuralThrone")?.appendChild(companionFeed);

    function logCompanionTrace(entry) {
        const entryDiv = document.createElement('div');
        entryDiv.textContent = `🔎 ${new Date().toLocaleTimeString()}: [${entry.type}] ${entry.content}`;
        companionFeed.appendChild(entryDiv);
        companionFeed.scrollTop = companionFeed.scrollHeight;

        // Optional fade out
        entryDiv.classList.add('trace-entry');
        setTimeout(() => {
            entryDiv.classList.add('fade-out');
            entryDiv.addEventListener('transitionend', () => entryDiv.remove());
        }, 6000);
    }

    // Reactive memory trace logging
    const originalAddMessage = addMessage;
    addMessage = function (text, sender) {
        originalAddMessage(text, sender);
        logCompanionTrace({ type: sender, content: text });
    };

    // === Phase 25: Contextual Panel Suggestion + Smart Activation Links ===
    function suggestPanelActivation(message) {
        const knownPanels = ['whispererVitals', 'signalForecastPanel']; // Extend as needed
        const match = knownPanels.find(id => message.toLowerCase().includes(id.toLowerCase()));
        if (match) {
            const suggestion = document.createElement('div');
            suggestion.classList.add('message', 'system');
            suggestion.innerHTML = `💡 Would you like to activate <strong>${match}</strong>? <button class="activate-panel-button" data-panel="${match}">Activate</button>`;
            chatContainer.appendChild(suggestion);
            chatContainer.scrollTop = chatContainer.scrollHeight;

            const button = suggestion.querySelector('button.activate-panel-button');
            button.addEventListener('click', () => {
                const panel = document.getElementById(match);
                if (panel) {
                    panel.classList.add('active');
                    simulateTypingResponse(`🟢 Activated panel: "${match}"`);
                } else {
                    simulateTypingResponse(`⚠️ Panel "${match}" not found.`);
                }
            });
        }
    }
    // === Phase 26: Lore Memory Inference Engine + Suggestive Sigil Mapping ===
    function suggestLoreSigil(message) {
        const loreMap = {
            prophecy: 'sigilProphecy',
            eclipse: 'sigilEclipse',
            shadow: 'sigilUmbra',
            flame: 'sigilIgnis',
            crystal: 'sigilAether',
            storm: 'sigilTempest'
        };

        for (const keyword in loreMap) {
            if (message.toLowerCase().includes(keyword)) {
                const suggestedSigil = loreMap[keyword];
                const suggestion = document.createElement('div');
                suggestion.classList.add('message', 'system');
                suggestion.innerHTML = `📜 Detected lore keyword: <strong>${keyword}</strong>. Would you like to activate <strong>${suggestedSigil}</strong>? <button class="activate-sigil-button" data-sigil="${suggestedSigil}">Invoke Sigil</button>`;
                chatContainer.appendChild(suggestion);
                chatContainer.scrollTop = chatContainer.scrollHeight;

                const button = suggestion.querySelector('button.activate-sigil-button');
                button.addEventListener('click', () => {
                    triggerLoreHook(suggestedSigil);
                    simulateTypingResponse(`🔮 Sigil "${suggestedSigil}" invoked.`);
                });

                break; // only one match per message
            }
        }
    }

    // Enhance handleSubmit to also check for lore suggestion
    const originalHandleSubmit = handleSubmit;
    handleSubmit = function () {
        const messageText = userInput.value.trim();
        if (messageText) {
            const parsedCommand = parseCommand(messageText);
            if (parsedCommand) {
                addMessage(`[${parsedCommand.type.toUpperCase()}] ${parsedCommand.value}`, 'system');
                logMemoryEntry(parsedCommand.type, parsedCommand.value);
                if (parsedCommand.type === 'sigil') {
                    triggerLoreHook(parsedCommand.value);
                } else if (parsedCommand.type === 'command' || parsedCommand.type === 'directive') {
                    triggerStateResponse(parsedCommand.value);
                    handleInternalCommand(parsedCommand.value);
                }
                userInput.value = '';
                userInput.style.height = 'auto';
                userInput.focus();
                return;
            }

            addMessage(messageText, 'user');
            logMemoryEntry('user', messageText);
            suggestPanelActivation(messageText);

            suggestLoreSigil(messageText); // new lore suggestion layer

            // === Phase 27: Smart Trigger System ===
            const smartTriggers = [
                {
                    keywords: ['show me the forecast', 'signal forecast', 'forecast report'],
                    panelId: 'signalForecastPanel',
                    response: '📡 Forecast panel activated via smart trigger.'
                },
                {
                    keywords: ['open vitals', 'show vitals', 'vitals panel'],
                    panelId: 'whispererVitals',
                    response: '📊 Vitals panel activated via smart trigger.'
                }
            ];

            function applySmartTriggers(text) {
                for (const trigger of smartTriggers) {
                    if (trigger.keywords.some(keyword => text.toLowerCase().includes(keyword))) {
                        const panel = document.getElementById(trigger.panelId);
                        if (panel) {
                            panel.classList.add('active');
                            simulateTypingResponse(trigger.response);
                        }
                        break;
                    }
                }
            }

            applySmartTriggers(messageText);

            simulateTypingResponse(`🧠 Whisperer received: "${messageText}"`);
            userInput.value = '';
            userInput.style.height = 'auto';
            userInput.focus();
        }
    };

// Delegate initialization to modules/initWhisperer.js
document.addEventListener('DOMContentLoaded', () => {
    initWhisperer();
});