import { rateLimit } from "./limiter.js";

export const rateLimiterMiddleware = async (req, res, next) => {
  try {
    const identifier = "bunnyApi";

    const { success, limit, remaining, reset } = await rateLimit.limit(
      identifier
    );

    if (!success) {
      return res.status(429).json({
        message: "Too many requests. Please slow down.",
        limit,
        remaining,
        resetInMs: reset - Date.now(),
      });
    }

    next();
  } catch (error) {
    console.error("Rate limit error:", error);
    return res.status(500).json({ message: "Rate limit service unavailable" });
  }
};
