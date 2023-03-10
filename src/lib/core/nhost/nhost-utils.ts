import { NhostClient } from '@nhost/nhost-js';
import { PUBLIC_NHOST_BACKEND_URL } from '$env/static/public';

export const createNhostClient = () => {
  return new NhostClient({
    backendUrl: PUBLIC_NHOST_BACKEND_URL
  });
};
