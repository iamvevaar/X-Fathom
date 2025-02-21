import React from "react";
import { Meteors } from "./meteors";

interface CardProps {
  title: string;
  description: string;
  buttonLabel: string;
}

function Card({ title, description }: CardProps) {
  return (
    <div className="relative w-72 md:w-64 h-80 md:h-96 mx-4 flex-shrink-0">
      {/* Background gradient */}
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] rounded-full blur-3xl" />
      
      <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
        <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500" />
        
        <h1 className="font-bold text-xl text-white mb-4 relative z-50">
          {title}
        </h1>
        <p className="font-normal text-sm md:text-base text-slate-500 mb-4 relative z-50">
          {description}
        </p>
        
        <Meteors number={20} />
      </div>
    </div>
  );
}

const cardData: CardProps[] = [
  {
    title: "Meteors because they're cool",
    description: "I don't know what to write so I'll just paste something cool here. One more sentence because lorem ipsum is just unacceptable.",
    buttonLabel: "Explore",
  },
  {
    title: "Another Feature",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    buttonLabel: "Discover",
  },
  {
    title: "Feature 3",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    buttonLabel: "Learn More",
  },
  {
    title: "Feature 3",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    buttonLabel: "Learn More",
  },
  {
    title: "Feature 3",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    buttonLabel: "Learn More",
  },
  {
    title: "Last one",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    buttonLabel: "Learn More",
  }
];

export default function CardCarousel() {
  // Duplicate the cards for seamless loop
  const cards = [...cardData, ...cardData];
  
  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="flex animate-marquee">
        <div className="flex w-1/2 justify-center gap-4">
          {cardData.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
        <div className="flex w-1/2 justify-center gap-4">
          {cardData.map((card, index) => (
            <Card key={`duplicate-${index}`} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}