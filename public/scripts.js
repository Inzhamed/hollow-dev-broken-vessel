document.addEventListener("DOMContentLoaded", () => {
  // Fetch and display CPU and RAM usage
  // const fetchMetrics = async () => {
  //   try {
  //     const response = await fetch("/api/system/metrics");
  //     const data = await response.json();
  //     document.getElementById("cpuUsage").innerText = `${data.cpuUsage}%`;
  //     document.getElementById("ramUsage").innerText = `${data.ramUsage}%`;
  //   } catch (error) {
  //     console.error("Error fetching system metrics:", error);
  //   }
  // };

  // // Fetch and display directory list
  // const fetchDirectories = async () => {
  //   try {
  //     const response = await fetch("/api/files/directories");
  //     const data = await response.json();
  //     const directoryList = document.getElementById("directoryList");
  //     directoryList.innerHTML = "";
  //     data.directories.forEach((dir) => {
  //       const listItem = document.createElement("li");
  //       listItem.innerText = dir;
  //       directoryList.appendChild(listItem);
  //     });
  //   } catch (error) {
  //     console.error("Error fetching directories:", error);
  //   }
  // };

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
  // fetchMetrics();
  // fetchDirectories();
});
