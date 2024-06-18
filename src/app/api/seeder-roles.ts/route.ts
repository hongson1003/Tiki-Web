import { roleSeeders } from "@/lib/seeders/seeder-roles";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        roleSeeders();
        return NextResponse.json({ message: 'Roles seeded successfully' });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({error: error.message}, { status: 500 });
        }else{
            return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
        }
    }
}