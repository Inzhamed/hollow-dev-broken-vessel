# Server Monitoring Web Application

This project is a server monitoring web application that allows participants to execute Linux commands, display directories, manage files, list running services, and monitor CPU and RAM usage. The app functions similarly to tools like Plesk and Webmin.

## Table of Contents

- [Server Monitoring Web Application](#server-monitoring-web-application)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Contributing](#contributing)




## Features

- **System Metrics Dashboard**: Displays CPU and RAM usage.
- **Directory Explorer**: Allows navigating and managing directories.
- **Service Management**: Create, start, and manage services.
- **File Configuration**: Configure files on the server.
- **Script Execution**: Execute bash scripts on the server.
- **Basic HTML Frontend**: User-friendly interface for interaction.
- **Security Measures**: Ensures robust security for server interactions.
  
## Project Structure

The repository is structured as follows:

```
hollow-dev-broken-vessel
├── package.json
├── src
│ ├── controllers
│ │ ├── directoryController.js
│ │ ├── sshController.js
│ │ ├── serviceController.js
│ │ └── metricsController.js
│ │
│ ├── routes
│ │ ├── directoryRoutes.js
│ │ ├── sshRoutes.js
│ │ ├── serviceRoutes.js
│ │ └── metricsRoutes.js
│ │
│ ├── utils
│ │ └── sshUtil.js
│ │
│ └── app.js
│ 
├── public
│ ├── index.html
│ ├── scripts.js
│ └── styles.css
└── README.md
```

## Technologies Used

- Node.js
- Express.js
- HTML/CSS
- JavaScript
- node-ssh
  
## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- SSH access to a remote server

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/inzhamed/hollow-dev-broken-vessel.git
   cd hollow-dev-broken-vessel
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment variables:**
   
    Create a `.env` file in the root directory and add the following environment variables:
    
     ```makefile
     SSH_HOST=your_ssh_host
     SSH_USERNAME=your_ssh_username
     SSH_PRIVATE_KEY_PATH=path_to_your_ssh_private_key
     ```

## Running the Application

1. **Start the application:**

   ```bash
   npm run dev
   ```

2. **Navigate to the web application:**

   Open your browser and go to `http://localhost:3000`.

3. **System Metrics Dashboard:**

   View real-time CPU and RAM usage.
   
4. **Directory Explorer:**

   Navigate through the directories and manage them.
   
5. **Service Management:**

   Create, start, and manage services.
   
6. **File Configuration:**

   Configure files directly from the web interface.

7. **Script Execution:**

   Execute bash scripts on the server.


## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.


