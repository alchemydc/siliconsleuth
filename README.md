<div align="center">

# 🕵️ SiliconSleuth

Monitor and track hardware availability with real-time Discord alerts

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Tests](https://github.com/alchemydc/siliconsleuth/actions/workflows/run-tests.yml/badge.svg?branch=dev&style=for-the-badge)](https://github.com/alchemydc/siliconsleuth/actions/workflows/run-tests.yml)

</div>

## ✨ Features

- 🔍 Monitor stock availability for hardware products from multiple retailers
- 🚨 Real-time Discord alerts with product details
- 💰 Instant price and availability updates
- 🔗 Direct purchase links included in alerts
- ⚙️ Simple configuration using environment variables

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd silicon_sleuth
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory with for example:
   ```env
   PRODUCTS_TO_FIND="nvidia rtx 5070ti,nvidia rtx 5080"
   DISCORD_WEBHOOK="your-discord-webhook-url"
   ```

4. **Verify setup:**
   ```bash
   npm test
   ```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
<div align="center">
Made with ❤️ by the SiliconSleuth team
</div>
