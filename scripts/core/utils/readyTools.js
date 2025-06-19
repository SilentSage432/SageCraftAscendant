// scripts/core/utils/readyTools.js
export function whenReady(callback, checkFn = () => true, maxWait = 10000) {
    const interval = 200;
    let waited = 0;
  
    if (checkFn()) return callback();
  
    const timer = setInterval(() => {
      if (checkFn()) {
        clearInterval(timer);
        callback();
      } else {
        waited += interval;
        if (waited >= maxWait) {
          clearInterval(timer);
          console.warn(`⏳ whenReady timeout after ${maxWait}ms`);
        }
      }
    }, interval);
  }