"use client";
import React, { useEffect, useState } from "react";
import { Meteors } from "./meteors";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"], // adjust weights as needed
});

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import volumeAnimation from "../../../public/animations/volume.json";

interface CardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

function Card({ title, description, children }: CardProps) {
  return (
    <div className={`${outfit.className} w-[350px] md:w-[450px] mx-6 p-4 relative h-[300px] flex-shrink-0`}>
      {/* Background gradient */}
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] rounded-full blur-3xl" />
      <div className="relative h-full shadow-xl bg-gray-900 border border-gray-800 px-8 py-6 rounded-2xl flex flex-col justify-start items-start">
        <span className="font-bold text-4xl text-white mb-4 relative z-50">
          {title}
        </span>
        {children && <div>{children}</div>}
        <p className="font-normal text-lg leading-[1.6] text-gray-400 mb-4 relative z-50">
          {description}
        </p>
        <Meteors number={20} />
      </div>
    </div>
  );
}

// Define the animations map
const animationsMap = {
  volume: volumeAnimation,
  // Add other animations here
};

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    title: string;
    description: string;
    animation?: keyof typeof animationsMap;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const addAnimation = () => {
      if (containerRef.current && scrollerRef.current) {
        const scrollerContent = Array.from(scrollerRef.current.children);
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });

        // Set animation direction
        if (containerRef.current) {
          containerRef.current.style.setProperty(
            "--animation-direction",
            direction === "left" ? "forwards" : "reverse"
          );
        }

        // Set animation speed
        if (containerRef.current) {
          const duration =
            speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
          containerRef.current.style.setProperty("--animation-duration", duration);
        }

        setStart(true);
      }
    };

    addAnimation();
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-80 md:max-w-7xl border p-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li key={idx} className="relative flex-shrink-0">
            <Card title={item.title} description={item.description}>
              {item.animation && (
                <Lottie
                  animationData={animationsMap[item.animation]}
                  loop={true}
                  autoplay={true}
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;
