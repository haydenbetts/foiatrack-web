export async function apiFetch(path: string, options: RequestInit = {}) {
  return fetch(`/api/proxy${path}`, options);
}
