import { auth0 } from "@/lib/auth0";

/**
 * Auth0 dynamic API route handler.
 * Handles /api/auth/login, /api/auth/logout, /api/auth/callback, /api/auth/me
 */
export const GET = auth0.handleAuth();
