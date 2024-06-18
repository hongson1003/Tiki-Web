import { strategySeeders } from "@/lib/seeders/strategy-seeder"; 
import { NextResponse } from "next/server";

export async function GET() {
    try {
        strategySeeders();
        return NextResponse.json({ message: 'Strategy seeders success' });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({error: error.message}, { status: 500 });
        }else{
            return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
        }
    }
}