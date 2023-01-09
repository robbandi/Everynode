import { appendFile } from "fs";
import { exec } from "child_process";

// Set the interval for checking the node process (in milliseconds)
const interval = 5000;

// Set the command to use for checking if the node process is running
const checkCommand = "ps aux | grep '[n]ode'";

// Set the command to use for restarting the node process
const restartCommand = "npm start";

// Set the path to the log file
const logPath = "./node_track.log";

// Start the node detection
nodeDetection();

function nodeDetection() {
  checkNodeProcess((err, running) => {
    if (err) {
      logError(err);
    } else if (!running) {
      log("Node process not running. Restarting...");
      restartNodeProcess((err) => {
        if (err) {
          logError(err);
        } else {
          log("Node process restarted.");
        }
      });
    } else {
      log("Node process running.");
    }
  });

  // Set the node detection to run again after the specified interval
  setTimeout(nodeDetection, interval);
}

function checkNodeProcess(callback) {
  exec(checkCommand, (err, stdout, stderr) => {
    if (err) {
      callback(err);
    } else {
      callback(null, stdout.length > 0);
    }
  });
}

function restartNodeProcess(callback) {
  exec(restartCommand, (err, stdout, stderr) => {
    callback(err);
  });
}

function log(message) {
  console.log(message);
  appendFile(logPath, `${new Date().toISOString()}: ${message}\n`, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function logError(error) {
  console.error(error);
  appendFile(
    logPath,
    `${new Date().toISOString()}: ${error.toString()}\n`,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
}