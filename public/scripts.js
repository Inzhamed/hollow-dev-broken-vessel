document.addEventListener("DOMContentLoaded", () => {
  // Fetch and display CPU and RAM usage
  const fetchMetrics = async () => {
    try {
      const response = await fetch("http://localhost:3000/metrics");
      const data = await response.json();

      // Update CPU metrics
      document.getElementById("cpuUsage").innerText =
        data.cpuMetrics.percentage;

      // Update RAM metrics
      document.getElementById("ramUsage").innerText =
        data.ramMetrics.percentage;
      document.getElementById("ramTotal").innerText = data.ramMetrics.total;
      document.getElementById("ramUsed").innerText = data.ramMetrics.used;
    } catch (error) {
      console.log("Error fetching system metrics:", error);
    }
  };

  // Fetch metrics periodically (every 5 seconds)
  setInterval(fetchMetrics, 5000);

  // Fetch and display directory list
  const fetchDirectories = async (path) => {
    try {
      const response = await fetch(
        "http://localhost:3000/directories/explore",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path }),
        }
      );
      const data = await response.json();
      const directoryList = document.getElementById("directoryList");
      directoryList.innerHTML = "";
      data.files.forEach((file) => {
        const listItem = document.createElement("li");
        listItem.innerText = `${file.permissions} ${file.links} ${file.owner} ${file.group} ${file.size} ${file.date} ${file.name}`;
        directoryList.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error fetching directories:", error);
    }
  };

  // Handle directory form submission
  const directoryForm = document.getElementById("directoryForm");
  directoryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const path = document.getElementById("directoryPath").value;
    fetchDirectories(path);
  });

  // Create directory
  const createDirectoryForm = document.getElementById("createDirectoryForm");
  createDirectoryForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const path = document.getElementById("directoryPath").value;
    const name = document.getElementById("newDirectoryName").value;
    try {
      const response = await fetch("http://localhost:3000/directories/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path, name }),
      });
      const data = await response.json();
      alert(data.message);
      fetchDirectories(path);
    } catch (error) {
      console.error("Error creating directory:", error);
    }
  });

  // Delete directory
  const deleteDirectoryForm = document.getElementById("deleteDirectoryForm");
  deleteDirectoryForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const path = document.getElementById("directoryPath").value;
    const name = document.getElementById("deleteDirectoryName").value;
    try {
      const response = await fetch("http://localhost:3000/directories/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path, name }),
      });
      const data = await response.json();
      alert(data.message);
      fetchDirectories(path);
    } catch (error) {
      console.error("Error deleting directory:", error);
    }
  });

  // Rename directory
  const renameDirectoryForm = document.getElementById("renameDirectoryForm");
  renameDirectoryForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const path = document.getElementById("directoryPath").value;
    const oldName = document.getElementById("oldDirectoryName").value;
    const newName = document.getElementById("newDirectoryNameRename").value;
    try {
      const response = await fetch("http://localhost:3000/directories/rename", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path, oldName, newName }),
      });
      const data = await response.json();
      alert(data.message);
      fetchDirectories(path);
    } catch (error) {
      console.error("Error renaming directory:", error);
    }
  });

  // Create service
  const createServiceForm = document.getElementById("createServiceForm");
  createServiceForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const serviceName = document.getElementById("serviceName").value;
    const serviceContent = document.getElementById("serviceContent").value;
    try {
      const response = await fetch("http://localhost:3000/services/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serviceName, serviceContent }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error creating service:", error);
    }
  });

  // Configure file
  const configureFileForm = document.getElementById("configureFileForm");
  configureFileForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const filePath = document.getElementById("filePath").value;
    const fileContent = document.getElementById("fileContent").value;
    try {
      const response = await fetch("http://localhost:3000/services/configure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filePath, fileContent }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error configuring file:", error);
    }
  });

  // Execute bash script
  const executeScriptForm = document.getElementById("executeScriptForm");
  executeScriptForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const script = document.getElementById("scriptContent").value;
    try {
      const response = await fetch("http://localhost:3000/services/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ script }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error executing script:", error);
    }
  });

  // Execute command
  const commandForm = document.getElementById("commandForm");
  const commandOutputElement = document.getElementById("commandOutput");
  const currentDirectoryElement = document.getElementById("currentDirectory");

  const updateCurrentDirectory = (directory) => {
    currentDirectoryElement.innerText = `Current Directory: ${directory}`;
  };

  commandForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const command = document.getElementById("commandInput").value;
    try {
      const response = await fetch("http://localhost:3000/ssh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command }),
      });
      const data = await response.json();
      commandOutputElement.innerText = data.output || data.error || "";
      updateCurrentDirectory(data.currentDirectory);
    } catch (error) {
      console.error("Error executing command:", error);
      commandOutputElement.innerText = "Error executing command";
    }
  });

  // Initial fetch to get the current directory
  fetch("http://localhost:3000/ssh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ command: "pwd" }),
  })
    .then((response) => response.json())
    .then((data) => {
      updateCurrentDirectory(data.currentDirectory);
    })
    .catch((error) => { 
      console.error("Error fetching initial directory:", error);
    });

  // Initial fetches
  fetchMetrics();
});
