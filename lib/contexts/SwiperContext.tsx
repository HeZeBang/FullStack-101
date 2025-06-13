"use client";

import { SwiperClass } from "swiper/react";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SwiperContextType {
  swiperInstance: SwiperClass | null;
  setSwiperInstance: React.Dispatch<React.SetStateAction<SwiperClass | null>>;
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
  totalSlides: number;
  setTotalSlides: React.Dispatch<React.SetStateAction<number>>;
}

const SwiperContext = createContext<SwiperContextType | undefined>(undefined);

interface SwiperProviderProps {
  children: ReactNode;
}

export const SwiperProvider: React.FC<SwiperProviderProps> = ({ children }) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  const nextSlide = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const prevSlide = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const goToSlide = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  const value: SwiperContextType = {
    swiperInstance,
    setSwiperInstance,
    currentSlide,
    setCurrentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    totalSlides,
    setTotalSlides,
  };

  return (
    <SwiperContext.Provider value={value}>
      {children}
    </SwiperContext.Provider>
  );
};

export const useSwiperContext = (): SwiperContextType => {
  const context = useContext(SwiperContext);
  if (context === undefined) {
    throw new Error("useSwiperContext must be used within a SwiperProvider");
  }
  return context;
};
