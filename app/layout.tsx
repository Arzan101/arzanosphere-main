import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "@/components/astrovista/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"
import Head from "next/head"
import Footer from "../components/astrovista/footer"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Arzanosphere",
    template: "%s | ArzanOsphere",
  },
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <Head>
        <meta name="google-site-verification" content="w9DnYHJVVt0qvUnPgDJ9HWrXy-Xk8CMPp2b_Nwk_mNI" />
        <link rel="icon" href="@/public/favicon.ico" />
        <link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
        <link rel="apple-touch-icon" href="/apple-icon?<generated>" type="image/<generated>" sizes="<generated>" />
      </Head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <Analytics />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
