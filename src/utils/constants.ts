export const backendUrl: string =
  (import.meta.env.VITE_BACKEND_URL as string) ?? "http://localhost:8000";

export const generateSessionEndpoint = `/session/generate`;
