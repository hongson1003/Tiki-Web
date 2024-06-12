import { seedRoles } from "@/lib/seeders";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const healthStatus = {
            status: 'ok',
            timeStamp: new Date().toISOString(),
        }
        return NextResponse.json(healthStatus);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({error: error.message}, { status: 500 });
        }else{
            return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
        }
    }
}