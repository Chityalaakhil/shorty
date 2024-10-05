import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

// In-memory storage for simplicity. Replace with a database in production.
const urlDatabase = new Map<string, string>();

export async function POST(req: Request) {

    try {
        const { originalUrl } = await req.json();

        if (!originalUrl) {
            return NextResponse.json({ error: "Original URL is required" }, { status: 400 });
        }

        try {
            const urlObject = new URL(originalUrl);
            if(!['http:', 'https:'].includes(urlObject.protocol)) {
                throw new Error("Invalid URL protocol");
            }
        } catch (error) {
            console.error("Error validating URL:", error);
            return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
        }

        const shortCode = nanoid(8); // Generate a random 8-character code
        const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/s/${shortCode}`;

        urlDatabase.set(shortCode, originalUrl);

        return NextResponse.json({ shortUrl });
    } catch (error) {
        console.error("Error shortening URL:", error);
        return NextResponse.json({ error: "Failed to shorten URL" }, { status: 500 });
    } finally {
        console.log("Database :", urlDatabase);
    }
}
 
export async function GET(req: Request) {
    const url = new URL(req.url);
    const shortCode = url.pathname.split("/").pop();
    const originalUrl = urlDatabase.get(shortCode || "");

    console.error("Original URL:", originalUrl);

    if(originalUrl) {
        return NextResponse.redirect(originalUrl);
    } else {
        return NextResponse.json({ error: "URL not found" }, { status: 404 });
    }

}
