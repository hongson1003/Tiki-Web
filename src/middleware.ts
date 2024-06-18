import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "next-auth/react"
import { IncomingMessage } from "http";

export async function middleware(req: NextRequest){
    const requestForNextAuth: Partial<IncomingMessage> & { body?: any } = {
        headers: {
          cookie: req.headers.get('cookie') ?? '',
        },
      };
      const session = await getSession({ req: requestForNextAuth });
        if (!session) {
            return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth/signin`);
        }
      try {
        return NextResponse.next();
    } catch (error) {
        console.log('error in middleware', error);
        return NextResponse.json({ status: 'Internal Server Error' }, { status: 500 });
    }
}


// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/api/categories',
    ],
    api: {
        bodyParser: false
    }
  }