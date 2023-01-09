# Everynode
A simple node detection watchdog for ensuring that a node process is always running.

## Installation
To install everynode, run the following command:

```npm install everynode```
## Usage
To use everynode, require the package and start the node detection process like this:

```const everynode = require("everynode");```

```everynode.nodeDetection();```

## Configuration
The following configuration options are available:

```interval (default: 5000)```: The interval at which to check for the node process (in milliseconds).
```checkCommand (default: "ps aux | grep '[n]ode'")```: The command to use for checking if the node process is running.
```restartCommand (default: "npm start")```: The command to use for restarting the node process.
```logPath (default: "./node_track.log")```: The path to the log file.
To change any of these options, pass an object with the desired values to the nodeDetection function like this:

```
const everynode = require("everynode");

everynode.nodeDetection({
  interval: 10000,
  checkCommand: "ps aux | grep '[n]ode'",
  restartCommand: "npm start",
  logPath: "./node_watchdog.log",
});
```

Logging
Everynode logs its activity to the console and to the log file specified in the logPath configuration option. If an error occurs, it will be logged as well.
