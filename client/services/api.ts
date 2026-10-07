/**
 * AgriConnect API configuration
 *
 * IMPORTANT:
 * If you are testing on a physical phone using Expo Go,
 * replace localhost with your computer's local IP address.
 *
 * Example:
 * http://192.168.1.10:5000
 */

// For Android Emulator:
export const API_BASE_URL = "http://192.168.48.239:5000";

// For a physical phone, use your computer's IP instead:
// export const API_BASE_URL = "http://192.168.1.100:5000";

export const apiUrl = (path: string) => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${API_BASE_URL}${cleanPath}`;
};

export const API_ENDPOINTS = {
  health: "/api/health",
  locationSearch: "/api/locations/search",
};
