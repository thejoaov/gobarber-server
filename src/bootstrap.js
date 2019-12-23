const dotenv = require('dotenv-safe');
const dotenvExpand = require('dotenv-expand');

const env = dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
  allowEmptyValues: true,
});

dotenvExpand(env);
