"use client";

import React from 'react';
import { useSwiperContext } from '@/lib/hooks/useSwiper';
import { Button } from '@/components/ui/button';

/**
 * 示例组件：展示如何使用 useSwiperContext
 * 这个组件必须在 SwiperProvider 内部使用
 */
export const SwiperControls: React.FC = () => {
  const { 
    currentSlide, 
    totalSlides, 
    nextSlide, 
    prevSlide, 
    goToSlide,
    swiperInstance 
  } = useSwiperContext();

  return (
    <div className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-md rounded-lg p-4 shadow-lg">
      <div className="flex flex-col gap-2 text-sm">
        <div>
          当前幻灯片: {currentSlide + 1} / {totalSlides}
        </div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            onClick={prevSlide}
            disabled={!swiperInstance || currentSlide === 0}
          >
            上一页
          </Button>
          <Button 
            size="sm" 
            onClick={nextSlide}
            disabled={!swiperInstance || currentSlide === totalSlides - 1}
          >
            下一页
          </Button>
        </div>
        <div className="flex gap-1 flex-wrap">
          {Array.from({ length: totalSlides }, (_, index) => (
            <Button
              key={index}
              size="sm"
              variant={currentSlide === index ? "default" : "outline"}
              className="w-8 h-8 p-0 text-xs"
              onClick={() => goToSlide(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
