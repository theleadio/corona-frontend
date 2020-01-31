import { API_BASE_URL } from '../config';

export const imageProxy = (url) => {
  return `${API_BASE_URL}/image-proxy?url=${url}`;
};
