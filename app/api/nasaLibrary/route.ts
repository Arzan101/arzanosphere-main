
// app/api/nasaLibrary/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("q") || "mars"
  const mediaType = searchParams.get("media_type") || "image"

  try {
    const res = await fetch(`https://images-api.nasa.gov/search?q=${query}&media_type=${mediaType}`)
    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("NASA API error:", error)
    return NextResponse.json({ error: "Failed to fetch NASA data" }, { status: 500 })
  }
}
