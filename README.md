# Frontend Deployment Documentation  
## Next.js Application

---

## 1. Overview

This document describes the deployment process for the Frontend Application.

The application is built using **Next.js** and is deployed as a standalone Node.js production server.

Deployment characteristics:

- Runs directly using Node.js
- Backend service must be running before starting the frontend

---

## 2. Important: Start Backend First

⚠️ The frontend depends on a backend API service.

Before starting the frontend application:

1. Clone the backend repository from the provided link:
   
   ```
   https://github.com/ElmWill/Acceloka.Api
   ```

2. Follow the backend README instructions.
3. Install backend dependencies.
4. Configure environment variables (if required).
5. Start the backend server.

Ensure the backend is running and accessible before proceeding.

Example backend check:

```
http://SERVER_IP:BACKEND_PORT
```

Only after confirming backend availability should you start the frontend.

---

## 3. System Requirements

- Windows Server / Linux Server
- Node.js (LTS version recommended, v18 or higher)
- Network access to required ports

To verify Node installation:

```bash
node -v
npm -v
```

---

## 4. Frontend Installation Procedure

Navigate to the frontend project directory:

```bash
cd acceloka
```

Install dependencies:

```bash
npm install
```

---

## 5. Production Build (Frontend)

Generate optimized production build:

```bash
npm run build
```

This creates a production-ready build inside:

```
.next/
```

---

## 6. Running the Frontend Application

Start the production server:

```bash
npm start
```

Default configuration:

- Host: localhost
- Port: 3000

Application access:

```
http://SERVER_IP:3000
```

---

## 7. Running on Custom Host / Port (If Required)

To expose the application to the network:

### Windows:

```bash
set HOSTNAME=0.0.0.0
set PORT=3000
npm start
```

### Linux:

```bash
HOSTNAME=0.0.0.0 PORT=3000 npm start
```

---

## 8. Operational Notes

- Backend must be running before frontend startup.
- The application runs as a Node.js process.
- If the server restarts, the application must be manually restarted.
- Ensure required ports are open in firewall settings.
- Only one instance should run per port.

---

## 9. Deployment Summary

- Architecture: Standalone Node.js Application
- Backend Dependency: Required and must be started first
- Suitable for: Internal deployment / Controlled production environment

---

Environment: Frontend Only  
Deployment Model: Direct Node.js Execution  
Backend Requirement: Mandatory
