"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

const title = "What is ArzanOsphere?"

const description =
  "It's a free, open-source web app that brings amazing space photos straight to your screen using NASA’s Astronomy Picture of the Day (APOD) API. Built with modern tools like Next.js, Tailwind CSS, and TypeScript, it’s designed to spark curiosity about space. Whether you're a developer or just love the stars, AstroVista is a fun way to explore the universe and connect with others who share your passion."

const BannerHomePage = () => {
  return (
    <section className="flex flex-col lg:flex-row w-full h-[500px] px-6 md:px-12">
      {/* Left Content */}
      <div className="flex flex-1 items-center justify-center">
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="pb-4 text-4xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="text-base font-light text-muted-foreground text-justify leading-relaxed">
            {description}
          </p>
          <div className="mt-6 flex justify-center lg:justify-start gap-4">
            <Button size="lg">
              <Link href="/apod">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline">
              <Link href="/about">About us</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Optional: Right side for future carousel or image */}
      {/* <div className="flex-1 bg-gray-900 rounded-xl mx-4">
        <Image ... />
      </div> */}
    </section>
  )
}

export default BannerHomePage
