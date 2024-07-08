const connectSSH = require("../utils/sshUtil");

const exploreDirectory = async (req, res) => {
  const { path } = req.body;

  try {
    const ssh = await connectSSH();

    const result = await ssh.execCommand(`ls -l ${path}`);
    if (result.stderr) {
      return res.status(500).json({ error: result.stderr });
    }

    const lines = result.stdout.split("\n").filter(Boolean);
    const files = lines.slice(1).map((line) => {
      const parts = line.split(/\s+/);
      return {
        permissions: parts[0],
        links: parts[1],
        owner: parts[2],
        group: parts[3],
        size: parts[4],
        date: `${parts[5]} ${parts[6]} ${parts[7]}`,
        name: parts.slice(8).join(" "),
      };
    });

    res.json({ files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDirectory = async (req, res) => {
  const { path, name } = req.body;

  try {
    const result = await ssh.execCommand(`mkdir ${path}/${name}`);
    if (result.stderr) {
      return res.status(500).json({ error: result.stderr });
    }

    res.json({ message: `Directory ${name} created successfully in ${path}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDirectory = async (req, res) => {
  const { path, name } = req.body;

  try {
    const result = await ssh.execCommand(`rm -r ${path}/${name}`);
    if (result.stderr) {
      return res.status(500).json({ error: result.stderr });
    }

    res.json({
      message: `Directory ${name} deleted successfully from ${path}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const renameDirectory = async (req, res) => {
  const { path, oldName, newName } = req.body;

  try {
    const result = await ssh.execCommand(
      `mv ${path}/${oldName} ${path}/${newName}`
    );
    if (result.stderr) {
      return res.status(500).json({ error: result.stderr });
    }

    res.json({
      message: `Directory ${oldName} renamed to ${newName} in ${path}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  exploreDirectory,
  createDirectory,
  deleteDirectory,
  renameDirectory,
};
