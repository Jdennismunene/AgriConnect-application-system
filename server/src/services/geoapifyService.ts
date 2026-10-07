interface GeoapifyResult {
  place_id?: string;
  name?: string;
  country?: string;
  country_code?: string;
  state?: string;
  state_code?: string;
  county?: string;
  county_code?: string;
  city?: string;
  suburb?: string;
  district?: string;
  postcode?: string;
  formatted?: string;
  result_type?: string;
  lat?: number;
  lon?: number;
}

interface GeoapifyResponse {
  results: GeoapifyResult[];
}

const GEOAPIFY_BASE_URL = "https://api.geoapify.com/v1/geocode/search";

export const searchLocations = async (
  query: string,
  language: "en" | "sw" = "en",
) => {
  const apiKey = process.env.GEOAPIFY_API_KEY;

  if (!apiKey) {
    throw new Error("GEOAPIFY_API_KEY is not configured");
  }

  const url = new URL(GEOAPIFY_BASE_URL);

  url.searchParams.set("text", query);
  url.searchParams.set("countrycodes", "ke");
  url.searchParams.set("lang", language);
  url.searchParams.set("limit", "8");
  url.searchParams.set("format", "json");
  url.searchParams.set("apiKey", apiKey);

  const response = await fetch(url.toString());

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Geoapify request failed with status ${response.status}: ${errorText}`,
    );
  }

  const data = (await response.json()) as GeoapifyResponse;

  if (!Array.isArray(data.results)) {
    throw new Error("Geoapify returned an unexpected response format");
  }

  return data.results.map((location) => ({
    id: location.place_id,
    name: location.name,
    formatted: location.formatted,

    country: location.country,
    countryCode: location.country_code,

    county: location.county,
    countyCode: location.county_code,

    state: location.state,
    stateCode: location.state_code,

    city: location.city,
    suburb: location.suburb,
    district: location.district,

    postcode: location.postcode,

    latitude: location.lat,
    longitude: location.lon,

    type: location.result_type,
  }));
};
