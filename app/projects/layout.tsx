"use client";

import { SwiperProvider } from "@/lib/contexts/SwiperContext"
import { Swiper, SwiperSlide } from "swiper/react"

export default function MDXLayout({
    children,
}: {
    children: React.ReactNode
}) {

    
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 prose">
                <SwiperProvider>
                    <Swiper>
                        <SwiperSlide>
                            {children}
                        </SwiperSlide>
                        <SwiperSlide>
                            {children}
                        </SwiperSlide>
                    </Swiper>
                </SwiperProvider>
            </main>
        </div>
    )
}