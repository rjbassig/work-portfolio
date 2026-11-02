import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageMeta } from "@/components/page-meta";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/data/site";

export const metadata: Metadata = { title: { default: "Randall Bassig — Data Science", template: "%s — Randall Bassig" }, description: site.description, metadataBase: new URL("https://randallbassig.com"), openGraph: { title: "Randall Bassig — Data Science @ UC San Diego", description: site.description, type: "website", url: "/" }, icons: { icon: [{ url: "/icon.png", type: "image/png", sizes: "32x32" }, { url: "/favicon.ico", type: "image/x-icon" }], shortcut: "/favicon.ico" } };
const themeScript = `try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}`;
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" data-theme="dark"><body><script dangerouslySetInnerHTML={{ __html: themeScript }} /><Header /><div className="global-actions"><ThemeToggle /></div><main><PageMeta />{children}</main><Footer /></body></html>; }
