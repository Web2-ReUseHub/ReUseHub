const API_BASE_URL = "http://localhost:5004";

export const authFetch = (url, options = {}) => {
  const token = localStorage.getItem("token");

  return fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
};