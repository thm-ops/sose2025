/* eslint-disable @cspell/spellchecker */
export const environments = {
  paypal: {
    clientId: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET',
    baseUrl: 'http://localhost:3000',
    apiBaseUrl: 'https://api-m.sandbox.paypal.com',
  },
} as const; 