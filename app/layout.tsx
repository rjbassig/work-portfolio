import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageMeta } from "@/components/page-meta";
import { ThemeToggle } from "@/components/theme-toggle";
import { CinematicIntro } from "@/components/cinematic-intro";

const siteDescription = "Randall Bassig's personal portfolio featuring data science, machine learning, software engineering, research projects, and writing.";

export const metadata: Metadata = {
  title: "randall’s portfolio",
  description: siteDescription,
  metadataBase: new URL("https://rjbassig.dev"),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: { title: "randall’s portfolio", description: siteDescription, siteName: "randall’s portfolio", type: "website", url: "/" },
  twitter: { card: "summary", title: "randall’s portfolio", description: siteDescription },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "32x32" }, { url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};
const themeScript = `try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}`;
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" data-theme="dark"><body><script dangerouslySetInnerHTML={{ __html: themeScript }} /><CinematicIntro /><Header /><div className="global-actions"><ThemeToggle /></div><main><PageMeta />{children}</main><Footer /></body></html>; }
