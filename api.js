const BASE_URL = "http://localhost:5000"; // URL do seu backend

const api = async (endpoint, method = "GET", body = null, token = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao processar a solicitação");
  }

  return data;
};

export default api;
