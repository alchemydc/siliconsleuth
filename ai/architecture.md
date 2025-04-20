# Architecture for Hard-to-Find Hardware Stock Alert App

Status: Draft

## Technical Summary

This document outlines the architecture for the Minimum Viable Product (MVP) of the Hard-to-Find Hardware Stock Alert App. The application will monitor specified hardware stock on authorized retailers (initially Best Buy, Microcenter, and NewEgg), sending immediate Discord notifications when the desired products become available. A basic web interface will display the tracked hardware and its monitoring status. This architecture prioritizes leveraging retailer APIs where available (like Best Buy's) and implements a web scraping strategy for others as a fallback. The system is designed for a single user initially, focusing on reliability and timely alerts.

**Note:** While this document is based on the current PRD, findings during implementation (e.g., using UI generation tools based on PRD specs, or initial coding stages) may lead to PRD refinements, which could in turn necessitate updates to this Architecture Document to maintain alignment.

## Technology Table

| Technology     | Version          | Description                                                                                                 |
| -------------- | ---------------- | ----------------------------------------------------------------------------------------------------------- |
| Node.js        | v22.x            | Backend runtime environment for core logic, API, and monitoring services.                                  |
| TypeScript     | Latest Stable    | Strong typing for JavaScript, used across the entire project for backend and frontend development.          |
| npm            | Latest Stable    | Package manager for Node.js dependencies.                                                                  |
| React          | v18.2.0          | JavaScript library for building the user interface.                                                         |
| Vite           | Latest Stable    | Build tool for the React frontend, known for its speed and simplicity.                                      |
| Tailwind CSS   | Latest Stable    | Utility-first CSS framework for styling the frontend with inherent dark mode support.                        |
| Axios          | v1.x             | Promise-based HTTP client for making API requests to retailers and potentially our backend.                  |
| Cheerio        | v1.x             | Fast, flexible, and lean implementation of core jQuery for server-side HTML parsing (for web scraping).       |
| Discord.js     | v14.x            | Powerful Node.js library for interacting with the Discord API (for sending webhook messages).                |
| Express        | v4.18.x          | Minimal and flexible Node.js web application framework for serving the basic frontend API.                   |
| Jest           | v29.x            | JavaScript testing framework for unit and integration tests.                                               |
| Concurrently   | v8.x             | Utility to run multiple commands concurrently (e.g., backend and frontend development servers).             |
| Dotenv         | v16.x            | Load environment variables from a `.env` file.                                                              |
| Git            | Any recent version | Version control system for managing code changes.                                                           |

## **High-Level Overview**

The architectural style will be a **Monolithic application** for this MVP. Given the initial scope for a single user and the focus on core functionality (monitoring and alerting), a monolith simplifies development, deployment, and management. Separating into microservices might introduce unnecessary complexity at this stage.

```mermaid
graph TD
    User[User Configures PRODUCTS_TO_FIND & DISCORD_WEBHOOK] --> Backend;
    Backend -- Periodically Checks --> RetailerWebsites[Best Buy (API), Microcenter (Scraping), NewEgg (Scraping)];
    RetailerWebsites -- Stock Updates --> Backend;
    Backend -- "In Stock" Alert --> Discord[Discord Channel via Webhook];
    Backend -- Tracked Products & Status --> Frontend[Basic Web UI];
    User -- Views Status --> Frontend;
```

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config.ts         # Handles reading environment variables
│   │   ├── monitor.ts        # Core logic for checking stock on retailers
│   │   ├── alerter.ts        # Handles sending Discord notifications
│   │   ├── api.ts            # Basic API endpoints for the frontend
│   │   └── index.ts          # Main entry point for the backend
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TrackedHardware.tsx
│   │   │   └── MonitoringStatus.tsx
│   │   ├── App.tsx           # Main app component
│   │   ├── main.tsx
│   │   └── assets/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.ts
│   └── tailwind.config.ts
├── .env                      # Environment variables (should not be committed)
├── .gitignore
└── README.md
