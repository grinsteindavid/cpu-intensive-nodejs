const { parentPort } = require("worker_threads");

const fibonacci = (n) => {
  return n < 1 ? 0 : n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
};

parentPort.on("message", (message) => {
  parentPort.postMessage(fibonacci(message));
});
