const API_BASE_URL = "http://localhost:5004/api/ai/generate-post";

export const authFetch = (options = {}) => {
  const token = localStorage.getItem("token");

  return fetch(API_BASE_URL, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
};