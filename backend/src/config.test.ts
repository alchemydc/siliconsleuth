import { getProductsToFind, getDiscordWebhook } from './config';

describe('Configuration Module', () => {
  beforeAll(() => {
    process.env.PRODUCTS_TO_FIND = 'nvidia rtx 5070ti,nvidia rtx 5080';
    process.env.DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/test-webhook';
  });

  afterAll(() => {
    delete process.env.PRODUCTS_TO_FIND;
    delete process.env.DISCORD_WEBHOOK;
  });

  test('should load and validate required environment variables', () => {
    expect(() => {
      getProductsToFind();
      getDiscordWebhook();
    }).not.toThrow();
  });

  test('should parse PRODUCTS_TO_FIND into an array of strings', () => {
    const products = getProductsToFind();
    expect(products).toEqual(['nvidia rtx 5070ti', 'nvidia rtx 5080']);
  });

  test('should retrieve DISCORD_WEBHOOK URI as a string', () => {
    const webhook = getDiscordWebhook();
    expect(webhook).toBe('https://discord.com/api/webhooks/test-webhook');
  });

  test('should throw an error if a required environment variable is missing', () => {
    delete process.env.PRODUCTS_TO_FIND;
    expect(() => getProductsToFind()).toThrow('Missing required environment variable: PRODUCTS_TO_FIND');
    process.env.PRODUCTS_TO_FIND = 'nvidia rtx 5070ti,nvidia rtx 5080';

    delete process.env.DISCORD_WEBHOOK;
    expect(() => getDiscordWebhook()).toThrow('Missing required environment variable: DISCORD_WEBHOOK');
    process.env.DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/test-webhook';
  });
});
