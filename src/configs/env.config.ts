function getEnvVar(key: string): string {
  const value = import.meta.env[key as keyof ImportMeta];
  if (typeof value === "undefined") {
    throw new Error(`Environment variable ${key} is not defined!`);
  }
  return value;
}

enum ENV {
  AUTH_API_URL = "VITE_AUTH_API_URL",
  BASE_API_URL = "VITE_BASE_API_URL",
}

// API
export const BASE_API_URL = getEnvVar(ENV.BASE_API_URL);
export const AUTH_API_URL = getEnvVar(ENV.AUTH_API_URL);
