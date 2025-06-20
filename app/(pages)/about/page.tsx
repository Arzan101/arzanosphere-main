"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Contributor } from "@/components/astrovista/contributor"

// Your images here
import Img1 from "@/public/coursel1.jpg"
import Img2 from "@/public/coursel2.jpg"
import Img3 from "@/public/coursel3.jpg"

const images = [Img1, Img2, Img3]

const technologies = [
  { name: "Next.js", icon: "/icons/svg/nextjs.svg" },
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "Tailwind CSS", icon: "/icons/svg/tailwind.svg" },
  { name: "Vercel", icon: "/icons/svg/vercel.svg" },
  { name: "Shadcn/ui", icon: "/icons/svg/shadcnui.svg" },
  { name: "Aceternity", icon: "/icons/svg/aceternity.svg" },
  { name: "v0", icon: "/icons/svg/v0.svg" },
]

const features = [
  { title: "Daily Space Images", description: "Explore a new astronomical image fetched every day." },
  { title: "Detailed Explanations", description: "Learn about each image with professional explanations by astronomers." },
  { title: "Gallery Archive", description: "Browse APODs since 1995 with search, sort, and filter tools." },
  { title: "Mobile Responsive", description: "Enjoy the cosmos on any device, anywhere." },
]

const Contributors = [
  {
    nickname: "Arzan",
    name: "Arzan Khan",
    role: "Project Owner",
    image: "https://arzan-portfolio.netlify.app/",
    linkedin: "https://www.linkedin.com/in/arzan-khan-9a9b611ba/",
    github: "https://github.com/Arzan101",
  },
]

const FuturePlans = [
  { desc: "Implement a user favorites system to save and organize preferred images." },
  { desc: "Internationalization support for auto-language detection." },
  { desc: "Add Mars Rover Photo exploration from NASA API." },
]

export default function AboutUs() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 2000) // Change every 4s
    return () => clearInterval(interval)
  }, [])

  const [activeTab, setActiveTab] = useState("overview")

  return (
    <>
      {/* 🪐 Carousel Section */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            animate={{ opacity: i === currentIndex ? 1 : 0 }}
          >
            <Image
              src={img}
              alt={`Slide ${i + 1}`}
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
              priority={i === 0}
            />
          </motion.div>
        ))}
      </div>

      {/* Content Section */}
      <div className="mx-auto w-full max-w-6xl px-4 py-16 space-y-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-2 rounded-lg shadow-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tech">Technologies</TabsTrigger>
            <TabsTrigger value="contributors">Contributors</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>Explore the cosmos through daily astronomical images</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {features.map((feature, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{feature.title}</AccordionTrigger>
                      <AccordionContent>{feature.description}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Technologies */}
          <TabsContent value="tech">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Technologies Used</CardTitle>
                <CardDescription>Built with modern frameworks and tools</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap justify-center gap-6">
                {technologies.map((tech) => (
                  <motion.div
                    key={tech.name}
                    className="flex flex-col items-center space-y-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image src={tech.icon} alt={tech.name} width={64} height={64} />
                    <span className="text-sm font-medium">{tech.name}</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contributors */}
          <TabsContent value="contributors">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Contributors</CardTitle>
                <CardDescription>The people behind the project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Contributors.map((c, i) => (
                  <Contributor
                    key={i}
                    nickname={`@${c.nickname}`}
                    name={c.name}
                    role={c.role}
                    img={c.image}
                    linkedin={c.linkedin}
                    github={c.github}
                  />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Future Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Future Plans</CardTitle>
              <CardDescription>What’s next for AstroVista</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">We’re always evolving. Upcoming features include:</p>
              <ul className="list-disc pl-6 space-y-2">
                {FuturePlans.map((plan, idx) => (
                  <li key={idx}>{plan.desc}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  )
}
