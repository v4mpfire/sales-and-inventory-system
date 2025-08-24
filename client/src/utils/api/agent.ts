import axios from 'axios';

import { store } from '../stores/store';

const sleep = (delay: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, delay));

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

agent.interceptors.request.use((config) => {
  store.uiStore.isBusy();
  return config;
});

agent.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    store.uiStore.isIdle();
    return response;
  },
  (error) => {
    store.uiStore.isIdle();
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default agent;
