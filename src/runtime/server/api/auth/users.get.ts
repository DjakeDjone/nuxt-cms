import { defineEventHandler } from "h3";
import { useAuthHandler } from "../../util/authHandler";

export default defineEventHandler(async (_event) => {
  const authHandler = useAuthHandler();

  return await authHandler.getAllUsers(); // TODO: sanitize users before returning
});
