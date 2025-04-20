# Hard-to-Find Hardware Stock Alert App PRD

## Status: Draft

## Intro

This document outlines the product requirements for the Minimum Viable Product (MVP) of the "Hard-to-Find Hardware Stock Alert App." This application aims to solve the problem of users missing out on limited stock of highly sought-after hardware, specifically starting with Nvidia 5xxx series GPUs, by automatically monitoring authorized retailers and sending immediate notifications when the desired products become available. The initial focus is on providing a functional tool for a single user, with the potential for expansion in future iterations.

## Goals and Context

- **Clear project objectives:** To build a working application that notifies the user via Discord when specified hard-to-find hardware is in stock at monitored retailers.
- **Measurable outcomes:** Successful delivery of real-time stock alerts for configured hardware on monitored websites via Discord. A basic web interface will display the tracked hardware and monitoring status.
- **Success criteria:** The application reliably monitors the specified retailers, accurately detects stock availability changes for the configured hardware, and promptly sends Discord notifications containing the product name, retailer, price (if available), and a direct link.
- **Key performance indicators (KPIs):**
    - Number of successful stock alerts sent.
    - Accuracy of stock detection (minimal false positives/negatives).
    - Uptime and reliability of the monitoring service.

## Features and Requirements

- **Functional requirements:**
    - **FR01: Hardware Configuration:** The application must allow the user to specify a list of hardware products to track via an environment variable (`PRODUCTS_TO_FIND`). The value of this variable will be a comma-separated string of product names (e.g., "nvidia rtx 5070ti,nvidia rtx 5080").
    - **FR02: Retailer Monitoring:** The application must be able to monitor the stock status of the configured hardware on a predefined list of retailer websites (initially Best Buy, Microcenter, and NewEgg, prioritizing those with public APIs).
    - **FR03: Stock Detection:** The application must accurately detect when the specified hardware becomes available (in stock) on the monitored retailer websites.
    - **FR04: Discord Alerting:** Upon detecting a stock change to "in stock" for a configured product, the application must send an immediate notification to a designated Discord channel via a webhook URI provided as an environment variable (`DISCORD_WEBHOOK`).
    - **FR05: Alert Content:** The Discord notification must include the product name, the name of the retailer where it is in stock, the current price (if available on the retailer's page), and a direct link to the product page on the retailer's website.
    - **FR06: Web UI - Tracked Hardware Display:** A simple web interface must display the list of hardware products currently being tracked (as configured in the `PRODUCTS_TO_FIND` environment variable).
    - **FR07: Web UI - Monitoring Status:** The web interface must display the current monitoring status for each tracked hardware item (e.g., "Monitoring," "Stock Found," "Error").

- **Non-functional requirements:**
    - **NFR01: Reliability:** The stock monitoring service should be reliable and run continuously without frequent interruptions.
    - **NFR02: Performance:** Stock checks should be performed frequently enough to provide timely alerts but without overloading the retailer websites (respecting rate limits if APIs are used).
    - **NFR03: Scalability (Initial):** The MVP is designed for a single user and does not need to be highly scalable in terms of concurrent users.
    - **NFR04: Security:** The Discord webhook URI must be handled securely (via environment variables and not hardcoded).

- **User experience requirements:**
    - **UXR01: Simple Configuration:** Configuring the tracked hardware through environment variables should be straightforward for a technically inclined user.
    - **UXR02: Clear Notifications:** Discord alerts should be informative and provide all necessary details to quickly access the product listing.
    - **UXR03: Minimal Web UI:** The web interface should be clean, easy to understand, and provide a quick overview of the application's status.
    - **UXR04: Dark Mode Support:** The web interface should have a smooth and minimal design that inherently supports system-level dark mode via Tailwind CSS.

- **Integration requirements:**
    - **IR01: Discord API Integration:** The application must successfully integrate with the Discord API to send webhook messages.
    - **IR02: Retailer Website Integration:** The application must be able to interact with the specified retailer websites, either through their public APIs or by scraping their HTML content.

- **Testing requirements:**
    - **TSR01: Unit Testing:** Unit tests should be implemented to verify the logic of individual components (e.g., stock checking functions, alert formatting).
    - **TSR02: Integration Testing:** Integration tests should verify the interaction between different parts of the application (e.g., monitoring service and Discord alerting).
    - **TSR03: End-to-End Testing (Manual):** Initial end-to-end testing will involve manually verifying that stock changes on the monitored websites trigger correct Discord notifications and updates on the web UI.

## Epic Story List

## Epic 0: Initial Project Setup and Configuration

- **Story 0.1: Project Initialization and Repository Setup**
  - Manually create a new project directory.
  - Initialize a Git repository and commit the initial empty state.
- **Story 0.2: Environment Configuration**
  - Manually create a `.env` file at the root of the project.
  - Instruct the user to manually set the `PRODUCTS_TO_FIND` environment variable with a comma-separated list of desired hardware (e.g., "nvidia rtx 5070ti").
  - Instruct the user to manually set the `DISCORD_WEBHOOK` environment variable with their Discord webhook URI.
- **Story 0.3: Local Development Environment Setup**
  - The user should manually install Node.js and npm (or yarn/pnpm) on their local machine.

## Epic 1: Backend Core Logic and Configuration

- **Story 1.1: Backend Project Setup (Node.js)**
  - Initialize a new Node.js project using `npm init -y`.
  - Install the `dotenv` dependency to load environment variables.
- **Story 1.2: Configuration Module Implementation**
  - Create a configuration module to securely read and provide access to the `PRODUCTS_TO_FIND` and `DISCORD_WEBHOOK` environment variables.
- **Story 1.3: Core HTTP Request Module**
  - Install the `axios` dependency.
  - Create a core module responsible for making HTTP GET requests to retailer websites or APIs.

## Epic 2: Backend - Retailer Monitoring Logic

- **Story 2.1: Best Buy Monitoring Logic**
  - Research and determine if Best Buy has a suitable public API for product availability.
  - Implement a function to fetch stock status and product details (name, availability, price, link) for configured products from Best Buy (prioritizing API if available).
- **Story 2.2: Microcenter Monitoring Logic**
  - Research and determine if Microcenter has a suitable public API for product availability.
  - If an API is not available or sufficient, install the `cheerio` dependency.
  - Implement a function to fetch stock status and product details (name, availability, price, link) for configured products from Microcenter using web scraping.
- **Story 2.3: NewEgg Monitoring Logic**
  - Research and determine if NewEgg has a suitable public API for product availability.
  - If an API is not available or sufficient, ensure the `cheerio` dependency is installed.
  - Implement a function to fetch stock status and product details (name, availability, price, link) for configured products from NewEgg using web scraping.

## Epic 3: Backend - Discord Alerting Service

- **Story 3.1: Discord.js Library Installation**
  - Install the `discord.js` dependency.
- **Story 3.2: Discord Message Formatting**
  - Implement a module that takes product information (name, retailer, price, link) and formats it into a clear and informative Discord message.
- **Story 3.3: Discord Webhook Integration**
  - Implement a function to send the formatted message to the Discord webhook URL retrieved from the configuration.
  - Implement basic error handling for Discord API communication.
- **Story 3.4: Test Discord Alerting Service**
  - Create a simple test script or function to manually trigger a Discord notification with sample product data to verify the integration.

## Epic 4: Backend - Main Monitoring Loop

- **Story 4.1: Monitoring Service Initialization**
  - Create a main function that initializes the monitoring service, reads the configured products, and sets up the polling interval.
- **Story 4.2: Periodic Stock Checking**
  - Implement the logic to periodically call the retailer monitoring functions for all configured products.
- **Story 4.3: Stock Status Comparison and Change Detection**
  - Implement logic to store the previous stock status of each tracked product and compare it with the current status.
- **Story 4.4: Alert Triggering Logic**
  - Implement the condition to trigger the Discord alerting service only when a product's status changes to "in stock."
- **Story 4.5: Basic Logging Implementation**
  - Implement a basic logging mechanism (e.g., using `console.log`) to track monitoring activity, stock changes, and potential errors.

## Epic 5: Backend - Basic API for Frontend

- **Story 5.1: Express.js Setup**
  - Install the `express` dependency.
- **Story 5.2: Tracked Hardware API Endpoint**
  - Create an API endpoint (`/api/tracked-hardware`) that returns the list of currently tracked hardware products (read from the configuration).
- **Story 5.3: Monitoring Status API Endpoint (Initial Static Response)**
  - Create an API endpoint (`/api/monitoring-status`) that initially returns a static or mock monitoring status for each tracked item (e.g., all "Monitoring").
- **Story 5.4: Basic Backend Server Setup**
  - Create the main server file (`api.js` or similar) to set up and run the Express.js server on a designated port.

## Epic 6: Frontend - Basic Web UI Setup

- **Story 6.1: Frontend Project Setup (React with Vite)**
  - Manually create a new React project using Vite (`npm create vite@latest`).
  - Select React and TypeScript.
- **Story 6.2: Install Frontend Dependencies**
  - Install necessary frontend dependencies: `react-router-dom`, `tailwindcss`, `autoprefixer`, and `axios`.
- **Story 6.3: Tailwind CSS Configuration**
  - Set up Tailwind CSS in the project, including updating the `vite.config.js` file, and importing Tailwind directives in the main CSS file.
- **Story 6.4: Basic Layout Component**
  - Create a basic layout component for the web UI.

## Epic 7: Frontend - Display Tracked Hardware

- **Story 7.1: Tracked Hardware Component**
  - Create a `TrackedHardware` React component.
- **Story 7.2: Fetch Tracked Hardware Data**
  - Implement functionality within the `TrackedHardware` component to fetch the list of tracked hardware from the backend `/api/tracked-hardware` endpoint using `axios`.
- **Story 7.3: Display Tracked Hardware List**
  - Render the fetched list of tracked hardware in a clean and readable format using Tailwind CSS styles.

## Epic 8: Frontend - Display Monitoring Status

- **Story 8.1: Monitoring Status Component**
  - Create a `MonitoringStatus` React component.
- **Story 8.2: Fetch Monitoring Status Data**
  - Implement functionality within the `MonitoringStatus` component to fetch the monitoring status for each tracked item from the backend `/api/monitoring-status` endpoint using `axios`.
- **Story 8.3: Display Monitoring Status Indicators**
  - Display the monitoring status for each tracked item using visual indicators (e.g., colored text or icons) based on the status (e.g., "Monitoring," "Stock Found," "Error").
- **Story 8.4: Implement Dark Mode Support**
  - Ensure the UI elements in both the `TrackedHardware` and `MonitoringStatus` components respect system-level dark mode using Tailwind CSS classes.

## Epic 9: Frontend - Integrate with Backend API

- **Story 9.1: Update Monitoring Status Endpoint (Backend)**
  - Update the backend `/api/monitoring-status` endpoint to dynamically reflect the actual monitoring status of each tracked item based on the backend's internal state.
- **Story 9.2: Integrate Frontend to Dynamic Status**
  - Update the `MonitoringStatus` component to correctly display the dynamic monitoring status fetched from the updated backend API endpoint.
- **Story 9.3: Handle Loading and Error States (Frontend)**
  - Implement basic loading indicators and error handling in the frontend components when fetching data from the backend.

## Epic 10: Initial Testing and Refinement

- **Story 10.1: Unit Tests (Backend)**
  - Implement unit tests using Jest for core backend logic modules (e.g., stock checking functions, alert formatting).
- **Story 10.2: Integration Tests (Backend)**
  - Implement integration tests using Jest to verify the interaction between different backend components (e.g., monitoring service and Discord alerting).
- **Story 10.3: Manual End-to-End Testing**
  - Manually verify that stock changes on the monitored websites trigger correct Discord notifications and updates on the web UI.
- **Story 10.4: Bug Fixing and Minor UI/UX Refinements**
  - Address any bugs or minor UI/UX issues identified during the manual testing phase.

This backlog provides a logical flow for developing the MVP, starting with the foundational setup, moving through the backend core logic and alerting, then building the basic frontend and integrating it with the backend. The final epic focuses on initial testing to ensure the core functionality works as expected.

## Technology Stack

| Technology         | Version              | Description                                                                 |
| ------------------ | -------------------- | --------------------------------------------------------------------------- |
| Node.js            | Latest Stable        | Backend runtime environment for core logic and API.                         |
| Typescript         | Latest Stable        | Strong typing for JavaScript, used across the entire project for backend and frontend development.
| npm (or yarn/pnpm) | Latest Stable        | Package manager for Node.js dependencies.                                  |
| React              | Latest Stable        | JavaScript library for building the user interface.                         |
| Vite               | Latest Stable        | Build tool for the React frontend, known for its speed and simplicity.      |
| Tailwind CSS       | Latest Stable        | Utility-first CSS framework for styling the frontend with dark mode support. |
| Axios              | Latest Stable        | Promise-based HTTP client for making API requests (if needed).              |
| Cheerio            | Latest Stable        | Fast, flexible, and lean implementation of core jQuery for server-side HTML parsing (if scraping is needed). |
| Discord API        | Latest Stable        | API for sending messages to Discord channels via webhooks.                  |
| Git                | Any recent version   | Version control system for managing code changes.                           |

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
│   │   ├── main.jsx
│   │   └── assets/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── .env                      # Environment variables (should not be committed)
├── .gitignore
└── README.md
```

### POST MVP / PRD Features

- Support for multiple hardware configurations through the web UI.
- Advanced filtering options (e.g., by price, specific retailer).
- Support for multiple alerting methods (e.g., email, SMS).
- User accounts and personalized settings.
- Retailer price tracking and comparison.
- Scalper detection/avoidance features.
- More polished and user-friendly UI/UX.
- Support for a wider range of retailers.
- Automated purchasing capabilities.

## Change Log

| Change               | Story ID | Description                                                   |
| -------------------- | -------- | ------------------------------------------------------------- |
| Initial draft        | N/A      | Initial draft PRD                                             |

## Unknowns, Assumptions, and Risks

**Unknowns:**

- The availability and structure of public APIs for Best Buy, Microcenter, and NewEgg.
- The complexity and frequency limits associated with scraping these websites if APIs are not available or sufficient.
- The exact HTML structure of the retailer websites, which might change and break the scraping logic.
- The best approach for handling rate limiting when interacting with retailer websites or APIs.
- The specific data points (beyond availability) that are reliably exposed by retailer APIs or easily scrapable (e.g., accurate price).

**Assumptions:**

- The user has a working Discord account and can create a webhook.
- The environment variables will be correctly configured by the user.
- The basic web UI will be sufficient for the initial MVP.
- The core logic for detecting "in stock" status can be implemented reliably based on the data obtained from retailers.

**Risks:**

- Retailer websites actively block scraping, making it unreliable.
- Retailer APIs are unavailable or do not provide the necessary stock information.
- Maintaining the scraping logic will require ongoing effort due to potential website changes.
- The application might generate false positive or negative stock alerts if the monitoring logic is not robust.
- Initial development might take longer than expected due to the need to research and implement website-specific monitoring logic.

This PRD provides a detailed outline for the MVP. Let me know if you have any questions or would like to refine any of these sections further!
