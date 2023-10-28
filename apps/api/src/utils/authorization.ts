import { z } from "zod";

export const headerSchema = z.object({
  "x-owner-id": z.string(),
});