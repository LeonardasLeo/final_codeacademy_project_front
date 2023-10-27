import { Config } from './src/types';

const config: Config = {
  serverRoute: 'http://localhost:3001',
  token: () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  },
};

export default config;
