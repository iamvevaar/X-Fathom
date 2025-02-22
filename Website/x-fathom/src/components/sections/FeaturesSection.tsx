import { SparklesCore } from "../ui/sparkles";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export default function FeaturesSection() {
  return (
    <div>
      <div className="h-[15rem] sm:h-[20rem] md:h-[25rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-center text-white relative z-20">
          Features
        </h2>
        <div className="sm:w-[30rem] md:w-[40rem]  sm:h-32 md:h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] md:w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px md:w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] md:w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px md:w-1/4" />

          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          <div className="absolute inset-0 w-full h-full bg-[#0a0a0a] [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
        </div>
      </div>

      <div className="h-[30rem] sm:h-[35rem] md:h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-[#0a0a0a] dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={items}
          direction="left"
          speed="fast"
          pauseOnHover={true}
        />
      </div>
    </div>
  );
}

const items = [
  {
    title: "Meteors because they're cool",
    description:
      "I don't know what to write so I'll just paste something cool here. One more sentence because lorem ipsum is just unacceptable.",
  },
  {
    title: "Another Feature",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Feature 3",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
