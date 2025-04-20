import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['PRODUCTS_TO_FIND', 'DISCORD_WEBHOOK'];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

// Parse PRODUCTS_TO_FIND into an array of strings
export const getProductsToFind = (): string[] => {
  const products = process.env.PRODUCTS_TO_FIND;
  if (!products) {
    throw new Error('Missing required environment variable: PRODUCTS_TO_FIND');
  }
  return products.split(',').map((product) => product.trim());
};

// Retrieve DISCORD_WEBHOOK URI
export const getDiscordWebhook = (): string => {
  const webhook = process.env.DISCORD_WEBHOOK;
  if (!webhook) {
    throw new Error('Missing required environment variable: DISCORD_WEBHOOK');
  }
  return webhook;
};
