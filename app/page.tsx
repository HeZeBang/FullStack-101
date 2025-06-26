"use client";

import Slides from "../components/template/GeekPieTemplate";
import slides from "./_data/demo";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Navigation Links */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Link
          href="/docs"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          📚 Documentation
        </Link>
        <Link
          href="/projects/v0"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
        >
          🔧 MDX Demo
        </Link>
      </div>
      
      <Slides data={slides}/>
    </main>
  );
}
