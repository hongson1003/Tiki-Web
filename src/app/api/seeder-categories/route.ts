import { categorySeeders } from "@/lib/seeders/categoriy-seeder";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        categorySeeders();
        return NextResponse.json({ message: 'Categories seeded successfully' });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({error: error.message}, { status: 500 });
        }else{
            return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
        }
    }
}