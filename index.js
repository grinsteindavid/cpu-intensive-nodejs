const { Worker } = require("worker_threads");
const ChildProcess = require("child_process");

function createChildProcess(payload) {
  return new Promise(function (resolve, reject) {
    const x = ChildProcess.fork("./process.js", {});
    x.send(payload);
    x.on("message", (data) => {
      console.log(`child process: ${data}`);
      resolve(data);
    });
    x.on("error", (msg) => {
      reject(`An error ocurred: ${msg}`);
    });
  });
}

function createWorker(payload) {
  return new Promise(function (resolve, reject) {
    const worker = new Worker("./worker.js", {
      workerData: { n: payload },
    });
    worker.on("message", (data) => {
      console.log(`worker: ${data}`);
      resolve(data);
    });
    worker.on("error", (msg) => {
      reject(`An error ocurred: ${msg}`);
    });
  });
}

const main = async () => {
  createChildProcess(50);
  createChildProcess(50);
  createChildProcess(50);
  //   createWorker(50);
};

main();
