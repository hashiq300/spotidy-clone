import { NextRequest, NextResponse } from "next/server"

const artists = [
    { id: "1", name: "Taylor Swift" },
    { id: "2", name: "Ariana Grande" },
    { id: "3", name: "Justin Bieber" },
    { id: "4", name: "BTS" },
    { id: "5", name: "Ed Sheeran" },
    { id: "6", name: "Rihanna" },
    { id: "7", name: "Drake" },
    { id: "8", name: "Billie Eilish" },
    { id: "9", name: "The Weeknd" },
    { id: "10", name: "Katy Perry" },
]

export const POST = async (request: NextRequest) => {
    const { search }: { search: string } = await request.json()
    const filtered = artists.filter((artist) => artist.name.toLowerCase().includes(search.toLowerCase()))
    return NextResponse.json({ artists: filtered.slice(0, 4) })
}