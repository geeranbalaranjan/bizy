import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired(async function middleware(
  req: NextRequest
) {
  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match protected routes: /dashboard/* and /onboarding
     * Exclude: / (landing), /api/auth/*, static files
     */
    "/dashboard/:path*",
    "/onboarding",
  ],
};
