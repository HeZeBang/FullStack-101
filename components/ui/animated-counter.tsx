"use client";

import { cn } from "@/lib/utils";
import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const fontSize = 30;
const padding = 15;
const height = fontSize + padding;

export function AnimatedCounter({ value, digits, className }: { value: number, digits?: number; className?: string }) {
  return (
    <div
      style={{ fontSize }}
      className={cn("flex space-x-3 overflow-hidden rounded-md bg-card px-2 leading-none text-card-foreground", className)}
    >
      {/* <Digit place={100} value={value} /> */}
      <Digit place={10} value={value} />
      <Digit place={1} value={value} />
    </div>
  );
}

function Digit({ place, value }: { place: number; value: number }) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace, value]);

  return (
    <div style={{ height }} className="relative w-[1ch] tabular-nums">
      {Array.from(Array(10).keys()).map((i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Number({ mv, number }: { mv: MotionValue; number: number }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  );
}