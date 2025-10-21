import { rateLimit } from "./limiter";

export const connect = async () => {
  const identifier = "bunnyApi";

  try {
    const { success } = await rateLimit.limit(identifier);

    if (!success) {
      return "Unable to process at this time";
    }

    return "Here you go!";
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};
