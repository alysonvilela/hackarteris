import { z } from "zod";

export const headerSchema = z.object({
  "x-api-key": z.string(),
});