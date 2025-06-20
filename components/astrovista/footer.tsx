import Link from "next/link"
import { SiGithub, SiInstagram } from "@icons-pack/react-simple-icons"

import { Separator } from "@/components/ui/separator"
import PlanetLogo from "./planet-logo"

const description = "ArzanOsphere is a NASA's Astronomy Picture of the Day API."

export default function Footer() {
  return (
    <footer className="mx-auto w-full bg-background md:container">
      <div className="mx-auto px-4 py-16 sx:mx-3 sx:px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-10">
          <div>
            <div className="flex items-center">
              <PlanetLogo size={28} />
              <span className="ml-2 text-xl font-bold">ArzanOsphere</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{description}</p>
            <div className="mt-6 flex gap-4 text-muted-foreground">
              <Link className="hover:text-primary" href="https://github.com/Arzan101" aria-label="Github">
                <SiGithub className="h-6 w-6" />
              </Link>
              <Link className="hover:text-primary" href="https://www.instagram.com/arzan__khan.__/" aria-label="Instagram">
                <SiInstagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
          
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; 2024 ArzanOsphere. 
          </p>
          <div className="mt-4 flex space-x-4 sm:mt-0">
            <p className="cursor-pointer text-xs text-muted-foreground hover:text-primary"> Check out my|<Link className="hover:text-primary" href="https://arzan-portfolio.netlify.app/">
              Portfolio
            </Link></p>
          </div>
        </div>
      </div>
    </footer>
  )
}
