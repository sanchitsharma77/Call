import { createAuthClient } from "better-auth/react";

console.log(process.env.BACKEND_URL);

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});
