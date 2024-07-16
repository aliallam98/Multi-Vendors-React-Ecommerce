import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  images: z.array(
    z.object({
      secure_url: z.string(),
    })
  ),
  createdBy: z.object({
    _id: z.string(),
    fullName: z.string(),
  }),
  stock: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
