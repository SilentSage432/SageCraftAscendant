// SageCraft Ascendant — Neural Namespace Core

const SageCraftAscendant = {
    NeuralBus: {
      subscribers: {},
  
      subscribe(channel, callback) {
        if (!this.subscribers[channel]) {
          this.subscribers[channel] = [];
        }
        this.subscribers[channel].push(callback);
        console.log(`🧬 Subscribed to channel: ${channel}`);
      },
  
      publish(channel, payload) {
        const listeners = this.subscribers[channel] || [];
        listeners.forEach(callback => {
          try {
            callback(payload);
          } catch (err) {
            console.error(`⚠ Error in NeuralBus subscriber for ${channel}:`, err);
          }
        });
      }
    },
  
    version: "Ascendant Modular v1.5",
    healthCheck() {
      console.log("✅ SageCraftAscendant Neural Core Operational.");
    }
  };
  
  SageCraftAscendant.healthCheck();