import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const subCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.object({
    secure_url: z.string(),
  }),
  createdBy: z.object({
    _id: z.string(),
    fullName: z.string(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SubCategory = z.infer<typeof subCategorySchema>;
