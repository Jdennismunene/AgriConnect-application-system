import { Request, Response } from "express";
import { searchLocations } from "../services/geoapifyService.js";

export const searchLocationController = async (req: Request, res: Response) => {
  try {
    const query = String(req.query.q || "").trim();

    const language = req.query.lang === "sw" ? "sw" : "en";

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    if (query.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must contain at least 2 characters",
      });
    }

    const locations = await searchLocations(query, language);

    return res.json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (error) {
    console.error("Location search error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to search locations",
    });
  }
};
