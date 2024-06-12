import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest){
    try {
        return NextResponse.next();
    } catch (error) {
        console.log('error in middleware', error);
        return NextResponse.json({ status: 'Internal Server Error' }, { status: 500 });
    }
}


// See "Matching Paths" below to learn more
export const config = {
    matcher: '/api/health',
    api: {
        bodyParser: false
    }
  }