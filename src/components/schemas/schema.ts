import { z } from "zod";

export const addProblemSchema = z.object({
  title: z.string().min(2, "Too Short").max(50, "Too Long"),
  description: z.string().min(2, "Too Short").max(2000, "Too Long"),
  constraints: z.string().min(2, "Too Short").max(2000, "Too Long"),
  test_cases: z
    .array(
      z.object({
        input: z.string().min(1, "Too Short").max(500, "Too Long").optional(),
        output: z.string().min(1, "Too Short").max(500, "Too Long").optional(),
      })
    )
    .optional(),
});

export const createContestSchema = z.object({
  title: z.string().min(2, "Too Short").max(50, "Too Long"),
  description: z.string().min(2, "Too Short").max(2000, "Too Long"),
  constraints: z.string().min(2, "Too Short").max(2000, "Too Long"),
  test_cases: z
    .array(
      z.object({
        input: z.string().min(1, "Too Short").max(500, "Too Long").optional(),
        output: z.string().min(1, "Too Short").max(500, "Too Long").optional(),
      })
    )
    .optional(),
});

export type addProblemFormFields = z.infer<typeof addProblemSchema>;
export type createContestFormFields = z.infer<typeof createContestSchema>;
