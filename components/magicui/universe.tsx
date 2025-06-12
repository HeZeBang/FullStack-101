"use client";

import { Globe } from "@/components/magicui/globe";
import { Particles } from "@/components/magicui/particles";
import { COBEOptions } from "cobe";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => { },
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  opacity: 0.9,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

export default function Universe() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  return (
    <>
      <Particles
        className="absolute inset-0 z-0"
        quantity={80}
        ease={80}
        vx={1}
        size={0.8}
        color={color}
        refresh
      />
      <Particles
        className="absolute inset-0 -z-20 opacity-50"
        quantity={20}
        ease={80}
        vx={-1}
        size={0.4}
        color={color}
        refresh
      />
      <Globe className="mt-[30vh] absolute mr-0 w-2/3"
        config={{
          ...GLOBE_CONFIG,
          ...resolvedTheme === 'dark' ? {
            baseColor: [0x3c / 0xff, 0x3c / 0xff, 0x3c / 0xff],
            markerColor: [1, 1, 1],
            glowColor: [1, 1, 1],
            diffuse: 2.2,
            dark: 1,
            mapBrightness: 10
          } : {},
        }}
      />
    </>
  )
}