import { initAuth0 } from "@auth0/nextjs-auth0";
import type { Claims, Session } from "@auth0/nextjs-auth0";

/**
 * Auth0 client instance initialized with environment variables:
 * - AUTH0_SECRET
 * - AUTH0_BASE_URL
 * - AUTH0_ISSUER_BASE_URL
 * - AUTH0_CLIENT_ID
 * - AUTH0_CLIENT_SECRET
 */
export const auth0 = initAuth0({
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

/**
 * Get the current session on the server side.
 * Use in Server Components, Route Handlers, Server Actions, and API routes.
 *
 * @param req - Optional request object (required when called from middleware or API routes)
 * @returns The session object or null if not authenticated
 */
export const getSession = auth0.getSession.bind(auth0);

/**
 * Get the current user on the server side.
 * Convenience helper that returns session?.user or null.
 *
 * @param req - Optional request object (required when called from middleware or API routes)
 * @returns The user (claims) object or null if not authenticated
 */
export async function getUser(
  ...args: Parameters<typeof auth0.getSession>
): Promise<Claims | null> {
  const session: Session | null | undefined = await auth0.getSession(...args);
  return session?.user ?? null;
}
