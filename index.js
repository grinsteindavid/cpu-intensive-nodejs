const { Worker } = require("worker_threads");
const ChildProcess = require("child_process");

function createChildProcess(payload) {
  return new Promise(function (resolve, reject) {
    const x = ChildProcess.fork("./process.js", {});
    x.send(payload);
    x.on("message", (data) => {
      console.log(`child process: ${data}`);
      x.disconnect();
      resolve(data);
    });
    x.on("error", (msg) => {
      x.disconnect();
      reject(`An error ocurred: ${msg}`);
    });
  });
}

function createWorker(payload) {
  return new Promise(function (resolve, reject) {
    const worker = new Worker("./worker.js");
    worker.postMessage(payload);
    worker.on("message", (data) => {
      console.log(`worker: ${data}`);
      worker.terminate();
      resolve(data);
    });
    worker.on("error", (msg) => {
      worker.terminate();
      reject(`An error ocurred: ${msg}`);
    });
  });
}

const main = () => {
  createWorker(5);
  createChildProcess(6);
  createChildProcess(6);
  createChildProcess(6);
  createWorker(9);
};

main();
