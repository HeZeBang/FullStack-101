"use client";

import React, { useCallback, useEffect } from "react";

// Swiper components, modules and styles
import { Autoplay, EffectCards, EffectCoverflow, HashNavigation, History, Keyboard, Navigation, Pagination, Virtual } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Universe from "@/components/magicui/universe";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { SlidesProps } from "@/lib/props";
import { EXTRA, SUBTITLE, TITLE } from "@/lib/consts";
import { useSwiperContext, SwiperProvider } from "@/lib/hooks/useSwiper";
import SpaceToFadeIn from "../animateIn";
import "./slide.css";

const SlidesContent: React.FC<SlidesProps> = (props: SlidesProps) => {
  const {
    swiperInstance,
    setSwiperInstance,
    currentSlide,
    setCurrentSlide,
    setTotalSlides
  } = useSwiperContext();

  const nextBtn = React.useRef<HTMLDivElement>(null);
  const prevBtn = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set total slides count
    setTotalSlides(props.data.length + 2); // +2 for cover and end slide
  }, [props.data.length, setTotalSlides]);

  useEffect(() => {
    if (swiperInstance) {
      // swiperInstance.on('keyPress', (swiper, key) => {
      //   console.log("Key pressed:", key, typeof key);
      //   if (Number(key) === 32) {
      //     swiper.slideNext(); // Slide to the next slide
      //   }
      // });
    }
  }, [swiperInstance])

  useEffect(() => {
    if (swiperInstance) {
      setCurrentSlide(swiperInstance.activeIndex);
      swiperInstance.on('slideChange', () => {
        setCurrentSlide(swiperInstance.activeIndex);
      });
    }
  }, [swiperInstance, setCurrentSlide]);

  useEffect(() => {
    if (!swiperInstance) return;

    // hash <-> index 映射
    const indexToHash = [
      "cover",
      ...props.data.map((_, idx) => `slide-${idx}`),
      "end"
    ];
    const hashToIndex = indexToHash.reduce((acc, hash, idx) => {
      acc[hash] = idx;
      return acc;
    }, {} as Record<string, number>);

    // slideChange 时更新 hash
    const handleSlideChange = () => {
      const hash = indexToHash[swiperInstance.activeIndex];
      if (hash && window.location.hash.replace(/^#/, "") !== hash) {
        window.location.hash = hash;
      }
    };
    swiperInstance.on("slideChange", handleSlideChange);

    // hash 变化时跳转
    const handleHashChange = () => {
      if (!swiperInstance) return;
      const hash = window.location.hash.replace(/^#/, "");
      const index = hashToIndex[hash];
      if (typeof index === "number" && swiperInstance.activeIndex !== index) {
        swiperInstance.slideTo(index, 0);
      }
    };
    window.addEventListener("hashchange", handleHashChange);

    // 初始载入时 hash 定位
    handleHashChange();

    return () => {
      swiperInstance.off("slideChange", handleSlideChange);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [swiperInstance, props.data]);

  // const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
  //   console.log("Key pressed:", event.key);
  //   if (event.key === "Space") {
  //     event.preventDefault(); // Prevent default spacebar scroll behavior
  //     if (swiperInstance) {
  //       swiperInstance.slideNext(); // Slide to the next slide
  //     }
  //   }
  // }, [swiperInstance]);

  return (
    <section className="w-full">
      <div className=" h-screen">
        <ul className="h-full w-full">
          <Swiper
            onSwiper={setSwiperInstance}
            // onKeyDown={handleKeyDown}
            tabIndex={0}
            navigation={{
              enabled: true,
              nextEl: nextBtn.current,
              prevEl: prevBtn.current
            }}
            pagination={{ type: "progressbar", clickable: true }}
            keyboard={{ enabled: true, }}
            // effect="cards"
            // speed={500}
            autoplay={false}
            loop={false}
            // hashNavigation={{
            //   replaceState: true,
            // }}
            virtual
            modules={[Autoplay, Navigation, Pagination, Keyboard, EffectCards, HashNavigation, Virtual]}
          >
            <div className="absolute right-5 bottom-5 z-10 rounded-full bg-[#f0f0f0aa] backdrop:blur-md p-2 flex items-center gap-2 border-outline border backdrop-blur-xl backdrop-saturate-200">
              <div ref={prevBtn} className="cursor-pointer">
                <ChevronLeft className="aspect-square w-7 h-7 rounded-full p-1 border hover:bg-white active:scale-95 transition-all" />
              </div>
              {/* <span>{currentSlide}</span> */}
              <AnimatedCounter value={currentSlide || 0} className="bg-[#f0f0f0aa]" />
              <div ref={nextBtn} className="cursor-pointer">
                <ChevronRight className="aspect-square w-7 h-7 rounded-full p-1 border hover:bg-white active:scale-95 transition-all" />
              </div>
            </div>
            <SwiperSlide key="cover" data-hash="cover" className="bg-white p-14 overflow-hidden" virtualIndex={0}>
              <div className="items-start justify-center flex w-full h-full gap-3 flex-col">
                <h1 className="text-7xl font-extrabold z-20">
                  {props.title || TITLE}
                </h1>
                <h2 className="text-3xl z-20">{props.subtitle || SUBTITLE}</h2>
                <span className="text-2xl text-muted-foreground z-20">{props.extra || EXTRA}</span>
              </div>
              <Universe />
            </SwiperSlide>
            {
              props.data.map((slide, index) => (
                <SwiperSlide key={index} data-hash={`slide-${index}`} className={cn("bg-white")} virtualIndex={index + 1}>
                  <main className="w-full h-full flex flex-col overflow-auto p-12">
                    {slide.layout === "title" ? (
                      <div className="flex flex-col gap-3 justify-center items-center w-full h-full">
                        <h1 className="text-7xl font-extrabold z-20">
                          {slide.title}
                        </h1>
                        <h2 className="text-3xl text-muted-foreground z-20">
                          {slide.subtitle}
                        </h2>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3 justify-center items-start">
                        {slide.content && slide.title && <h2 className="text-4xl font-bold mb-4 sticky">{slide.title}</h2>}
                        {slide.content && slide.subtitle && <h3 className="text-3xl text-muted-foreground mb-4 sticky">{slide.subtitle}</h3>}
                        <div className="flex-grow w-full">
                          {slide.autoAnimate ? (
                            <SpaceToFadeIn pageNum={index + 1}>{slide.content}</SpaceToFadeIn>
                          ) : (
                            slide.content
                          )}
                        </div>
                      </div>
                    )}
                  </main>
                </SwiperSlide>
              ))
            }
            <SwiperSlide key="end" data-hash="end" className="bg-white p-14 overflow-hidden" virtualIndex={props.data.length + 1}>
              <div className="items-start justify-center flex w-full h-full gap-5 flex-col">
                <h1 className="text-7xl font-extrabold z-20">
                  Thanks for watching!
                </h1>
                <span className="text-2xl text-muted-foreground z-20">{props.extra || EXTRA}</span>
              </div>
              <Universe />
            </SwiperSlide>
          </Swiper>
        </ul>
      </div>
    </section>
  );
};

const Slides: React.FC<SlidesProps> = (props: SlidesProps) => {
  return (
    <SwiperProvider>
      <SlidesContent {...props} />
    </SwiperProvider>
  );
};

export default Slides;
