import { config } from 'dotenv';
import { join } from 'path';

const envConfig = config({
  path: join(
    __dirname,
    '../../',
    `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
  ),
});

export default (key: string) => {
  return ('parsed' in envConfig && envConfig.parsed[key]) || process.env[key];
};
