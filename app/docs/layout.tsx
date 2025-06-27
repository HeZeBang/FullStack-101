"use client";

import { NavBar } from "@/components/ui/tubelight-navbar";
import { NAVBAR_ITEMS } from "@/lib/consts";
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <main className="sm:my-20">
                <NavBar items={NAVBAR_ITEMS} />
                {children}
            </main>
        </>
    );
}
