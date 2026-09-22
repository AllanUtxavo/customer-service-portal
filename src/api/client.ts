import axios from 'axios';

import { userManager } from '../auth/oidc';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const user = await userManager.getUser();

    if (
      user?.access_token &&
      !user.expired
    ) {
      config.headers.Authorization =
        `Bearer ${user.access_token}`;
    }

    return config;
  },
);