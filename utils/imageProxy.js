export const imageProxy = (url) => {
  return `${process.env.API_BASE_URL}/image-proxy?url=${url}`;
};
