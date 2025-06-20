"use client"

import React, { useState, useEffect } from "react"
import { Picture } from "@/lib/mongo/pictures"
import Image from "next/image"
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link"
import ReactPlayer from "react-player"

async function getTodayApod(): Promise<Picture | null> {
  try {
    const res = await fetch(`/api/apod/latestApod`)
    
    if (!res.ok) {
      console.error("Failed to fetch APOD:", res.status)
      return null
    }

    const text = await res.text()

    if (!text) {
      console.error("Empty response body from APOD API")
      return null
    }

    return JSON.parse(text) as Picture
  } catch (error) {
    console.error("Error fetching APOD:", error)
    return null
  }
}

export default function APOD() {
  const [todayApod, setTodayApod] = useState<Picture | null>(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    getTodayApod().then((apod) => {
      if (apod) setTodayApod(apod)
    })
  }, [])

  if (todayApod && todayApod.copyright != undefined && !todayApod.copyright.startsWith("©")) {
    todayApod.copyright = `© ${todayApod.copyright}`
  }

  const formattedDate = todayApod?.date
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(todayApod.date.replace(/-/g, "/")))
    : ""

  return (
    <>
      {todayApod ? (
        <div className="flex w-full flex-col items-center px-12 py-12">
          <h1 className="mx-auto mb-4 text-4xl font-bold tracking-tighter sm:text-3xl md:text-2xl lg:text-4xl">
            Astronomy Picture of the Day
          </h1>

          <div className="flex w-full flex-col items-center rounded-xl">
            {todayApod.media_type === "image" ? (
              <>
                {!imageLoaded && (
                  <div className="flex h-[400px] w-full items-center justify-center">
                    <Spinner size="large" />
                  </div>
                )}
                <Link href={todayApod.hdurl ?? "#"} passHref target="_blank">
                  <Image
                    className={`w-auto rounded-xl ${!imageLoaded ? "hidden" : ""}`}
                    src={todayApod.url ?? "#"}
                    alt={todayApod.title}
                    width={900}
                    height={900}
                    priority
                    onLoad={() => setImageLoaded(true)}
                  />
                </Link>
              </>
            ) : (
              <ReactPlayer url={todayApod.url} controls loop />
            )}
            {todayApod.copyright && (
              <p className="mb-7 mt-1 max-w-[900px] text-base font-light text-muted-foreground sm:text-base">
                {todayApod.copyright}
              </p>
            )}
          </div>

          <div className="lg:max-w-[900px]">
            <h1 className="mb-1 mr-auto text-4xl font-bold tracking-tighter sm:text-3xl md:text-2xl lg:text-4xl">
              {todayApod.title}
            </h1>
            <h2 className="mb-7 max-w-[900px] text-base font-light text-muted-foreground sm:text-base">
              {formattedDate}
            </h2>
            <span className="text-xl font-semibold">
              Description:
              <p className="text-justify text-base font-light text-muted-foreground sm:text-base lg:max-w-[900px]">
                {todayApod.explanation}
              </p>
            </span>
          </div>
        </div>
      ) : (
        <div className="flex h-screen w-full flex-wrap justify-center items-center">
          <Spinner size="large" />
          <p className="ml-2 text-muted-foreground">Loading...</p>
        </div>
      )}
    </>
  )
}
