import { defineEventHandler, getRouterParam } from "h3";
import { createError } from "#imports";
import type { ApiResponse } from "../../../model/response";
import { useDefaultStorage } from "../../../util/storage";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") ?? "content";

  const storage = useDefaultStorage();
  const content = await storage.getItem(id);

  if (!content) {
    throw createError({
      statusCode: 404,
      message: `Content with id "${id}" not found`,
    });
  }

  return {
    id: id,
    message: "Content retrieved successfully",
    content: content,
  } as ApiResponse<string>;
});
