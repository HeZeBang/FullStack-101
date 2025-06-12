"use client";

import Slides from "../components/template/GeekPieTemplate";
import slides from "./_data/demo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Slides data={slides}/>
    </main>
  );
}
