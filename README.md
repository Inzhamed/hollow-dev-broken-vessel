# hollow-dev-broken-vessel

This project is a server monitoring web application that allows participants to execute Linux commands, display directories, manage files, list running services, and monitor CPU and RAM usage. The app functions similarly to tools like Plesk or Webmin.

## Folder Structure
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

## Requirements

- Implement a dashboard to display system metrics (e.g., CPU and RAM usage).
- Develop a directory explorer for navigating and managing directories.
- Ensure robust security measures are in place.
- Provide a basic HTML frontend.
- Enable interaction with the server to create services, configure files, and execute bash scripts.

## How to Run

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the server with `npm run dev`.
4. Access the frontend at `http://localhost:3000`.
