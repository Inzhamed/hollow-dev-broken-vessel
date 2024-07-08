const connectSSH = require("../utils/sshUtil");

let currentDirectory = "~";

const executeRemoteCommand = async (req, res) => {
  const { command } = req.body;

  try {
    const ssh = await connectSSH();

    let fullCommand;
    if (command.startsWith("cd ")) {
      fullCommand = `cd ${currentDirectory} && ${command} && pwd`;
    } else {
      fullCommand = `cd ${currentDirectory} && ${command} && pwd`;
    }

    const result = await ssh.execCommand(fullCommand);

    if (result.stderr) {
      res.json({ output: result.stderr, currentDirectory });
      return;
    }

    const outputLines = result.stdout.split("\n");
    const commandOutput = outputLines.slice(0, -1).join("\n");
    currentDirectory = outputLines[outputLines.length - 1].trim();

    res.json({ output: commandOutput, currentDirectory });
  } catch (error) {
    res.status(500).json({ error: "Failed to execute command: " + error });
  }
};

module.exports = { executeRemoteCommand };
