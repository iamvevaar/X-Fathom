import React from "react";
import { Compare } from "../ui/compare";
import { Cover } from "../ui/cover";

export default function HeroSection() {
  return (
    <div className="container flex flex-col md:flex md:flex-row md:items-center md:justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Enhanced Experienced <br /> with <Cover>X-Fathom</Cover>
        </h1>

        <button className="inline-flex h-14 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-extrabold text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Download Now
        </button>
      </div>
      <div className="p-4 flex items-center justify-center border rounded-3xl dark:bg-neutral-900 bg-neutral-100  border-neutral-200 dark:border-neutral-800 px-4">
        <Compare
          firstImage="/images/new.png"
          secondImage="/images/old.png"
          firstImageClassName="object-cover object-left-top"
          secondImageClassname="object-cover object-left-top"
          className="h-[250px] w-[100%] md:h-[500px] md:w-[900px]"
          slideMode="hover"
          autoplay={false}
        />
      </div>
    </div>
  );
}
