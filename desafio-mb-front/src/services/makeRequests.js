export function makeRequests() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const _instance = async ({
    path,
    method = "GET",
    params = {},
    headers = {},
    body
  }) => {
    const url = new URL(path, BASE_URL);
    const query = new URLSearchParams(params);
    url.search = query.toString();

    body = JSON.stringify(body);

    headers = {
      ...headers,
      "Content-Type": "application/json"
    }

    return await fetch(url, { body, method, headers, mode: "cors" })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res);
        }

        return res.json();
      })
      .catch((error) => {
        throw error?.message;
      })
  }

  async function read(path, payload) {
    return await _instance({ ...payload, path, method: "GET" });
  }
  async function create(path, payload) {
    return await _instance({ ...payload, path, method: "POST" });
  }
  async function put(path, payload) {
    return await _instance({ ...payload, path, method: "UPDATE" });
  }
  async function remove(path, payload) {
    return await _instance({ ...payload, path, method: "DELETE" });
  }

  return {
    read,
    create,
    put,
    remove
  }
}