import { z } from "zod";

export const EchoValidation = z.object({
  echo: z.string().min(3, { message: "Minimum of 3 characters" }),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  echo: z.string().min(3, { message: "Minimum of 3 characters" }),
  accountId: z.string(),
});
