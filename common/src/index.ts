import z from "zod";

export const signupInput = z.object({
  name: z.string(), 
  username: z.string().email(),
  password: z.string().min(6),
});

export type SignupInput = z.infer<typeof signupInput>;

export const signinInput = z.object({
  username: z.string(),
  password: z.string(),
});
export type SigninInput = z.infer<typeof signinInput>;

export const createPostInput = z.object({
  title: z.string(),
  content: z.string(),
});
export type CreatePostInput = z.infer<typeof createPostInput>;

export const updatePostInput = z.object({
  content: z.string(),
  title: z.string(),
});

export type UpdatePostInput = z.infer<typeof updatePostInput>;
