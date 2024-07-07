const { NodeSSH } = require("node-ssh");
const fs = require("fs");
const { log } = require("console");
const ssh = new NodeSSH();

const getSystemMetrics = async (req, res) => {
  try {
    const sshkey = fs.readFileSync(process.env.SSH_PRIVATE_KEY_PATH, "utf8");
    await ssh.connect({
      host: process.env.SSH_HOST,
      username: process.env.SSH_USERNAME,
      privateKey: sshkey,
    });

    const cpuResult = await ssh.execCommand('top -bn1 | grep "Cpu(s)"');
    const memResult = await ssh.execCommand("free -m");

    ssh.dispose();

    // Parse CPU usage percentage
    const cpuUsage = parseFloat(cpuResult.stdout.match(/(\d+\.\d+)\s+id/)[1]);

    // Parse total and used memory
    const memUsage = memResult.stdout.match(/Mem:\s+(\d+)\s+(\d+)/);
    const totalMem = parseInt(memUsage[1]);
    const usedMem = parseInt(memUsage[2]);

    // Calculate CPU and RAM metrics
    const cpuMetrics = {
      percentage: (100 - cpuUsage).toFixed(2) + "%",
    };
    const ramMetrics = {
      percentage: ((usedMem / totalMem) * 100).toFixed(2) + "%",
      total: totalMem + "MB",
      used: usedMem + "MB",
    };

    res.json({
      cpuMetrics,
      ramMetrics,
    });
  } catch (error) {
    console.log("Error fetching system metrics:", error);
    res.status(500).json({ error: "Failed to fetch system metrics" });
  }
};

module.exports = { getSystemMetrics };
