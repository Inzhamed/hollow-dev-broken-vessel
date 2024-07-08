// src/utils/sshUtil.js
const { NodeSSH } = require("node-ssh");
const fs = require("fs");

const ssh = new NodeSSH();

const connectSSH = async () => {
  try {
    const sshKey = fs.readFileSync(process.env.SSH_PRIVATE_KEY_PATH, "utf8");
    await ssh.connect({
      host: process.env.SSH_HOST,
      username: process.env.SSH_USERNAME,
      privateKey: sshKey,
    });
    return ssh;
  } catch (error) {
    console.error("Error connecting to SSH:", error);
    throw error;
  }
};

module.exports = connectSSH;