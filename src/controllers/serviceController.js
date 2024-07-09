const connectSSH = require("../utils/sshUtil");

// Create service
const createService = async (req, res) => {
  const { serviceName, serviceContent } = req.body;

  try {
    const ssh = await connectSSH();

    const serviceFilePath = `/etc/systemd/system/${serviceName}`;
    await ssh.execCommand(
      `echo "${serviceContent}" | sudo tee ${serviceFilePath}`
    );
    await ssh.execCommand(`sudo systemctl daemon-reload`);
    await ssh.execCommand(`sudo systemctl start ${serviceName}`);
    await ssh.execCommand(`sudo systemctl enable ${serviceName}`);

    res.json({ message: "Service created and started successfully" });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Error creating service", error });
  } 
  // finally {
  //   ssh.dispose();
  // }
};

// Configure files
const configureFile = async (req, res) => {
  const { filePath, fileContent } = req.body;
  try {
    const ssh = await connectSSH();

    const result = await ssh.execCommand(`echo "${fileContent}" > ${filePath}`);
    res.json({
      message: "File configured successfully",
      output: result.stdout || result.stderr,
    });
  } catch (error) {
    res.status(500).json({ message: "Error configuring file", error });
  }
};

// Execute bash script
const executeBashScript = async (req, res) => {
  const { script } = req.body;
  try {
    const ssh = await connectSSH();

    const result = await ssh.execCommand(script);
    res.json({
      message: "Script executed successfully",
      output: result.stdout || result.stderr,
    });
  } catch (error) {
    res.status(500).json({ message: "Error executing script", error });
  }
};

module.exports = {
  createService,
  configureFile,
  executeBashScript,
};
