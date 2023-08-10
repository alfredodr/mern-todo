import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const { pathname, origin } = req.nextUrl;
    const { token } = req.nextauth;

    //user visits the admin page without being an admin, gets redirected to home page
    if (pathname.startsWith("/admin") && token?.user?.role !== "admin") {
      return NextResponse.redirect(origin);
      // return new NextResponse("You are not authorized");
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token; // true => middleware() is run
      },
    },
  }
);

export const config = { matcher: ["/admin", "/profile", "/todos"] };
