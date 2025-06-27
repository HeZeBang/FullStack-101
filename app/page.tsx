"use client";

import { Footer7 } from "@/components/ui/footer-7";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { useEffect } from "react";
import { NAVBAR_ITEMS } from "@/lib/consts";
import { FaBilibili, FaGithub } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";

export default function Home() {
  useEffect(() => {
    document.querySelector("html")?.classList.add("dark");
    return () => {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavBar items={NAVBAR_ITEMS} />
      <HeroGeometric badge="A Coffie With Pie" title1="GeekPie_" title2="Fullstack 101" 
        description="Learn how to build a fullstack web application from scratch."
      />
      <footer>
        <Footer7 
          logo={{
            url: "https://geekpie.club/",
            src: "geekpie_Logo.svg",
            alt: "GeekPie_",
            title: "Association",
          }}
          description="上海科技大学 GeekPie 学生社团 | ZAMBAR"
          sections={[
            {
              title: "About GeekPie_",
              links: [
                { name: "Github", href: "https://github.com/ShanghaitechGeekPie/" },
                { name: "Website", href: "https://geekpie.club/" },
              ],
            },
            {
              title: "About ZAMBAR",
              links: [
                { name: "Github", href: "https://github.com/HeZeBang" },
                { name: "Website", href: "https://hezebang.github.io/" },
              ],
            },
            {
              title: "Resources",
              links: [
                { name: "Docs", href: "https://fullstack101.geekpie.tech/docs" },
                { name: "Piazza", href: "/piazza" }
              ]
            }
          ]}
          copyright="Made with ❤️ by ZAMBAR."

          socialLinks={[
            { icon: <FaBilibili />, href: "https://space.bilibili.com/156494172", label: "Bilibili" },
            { icon: <LuMail />, href: "mailto: pie@geekpie.club", label: "Email" },
            { icon: <FaGithub />, href: "https://github.com/HeZeBang", label: "Github" },
          ]}
          legalLinks={[]}
        />
      </footer>
    </main>
  );
}
