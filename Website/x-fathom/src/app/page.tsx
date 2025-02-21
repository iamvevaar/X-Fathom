import { Compare } from "@/components/ui/compare";
import { Cover } from "@/components/ui/cover";

export default function Home() {
  return (
    <div className="container">
      <div className="flex items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Enhanced Experienced <br /> with <Cover>X-Fathom</Cover>
        </h1>
        <div className="p-4 border rounded-3xl dark:bg-neutral-900 bg-neutral-100  border-neutral-200 dark:border-neutral-800 px-4">
        <Compare
          firstImage="/images/new.png"
          secondImage="/images/old.png"
          firstImageClassName="object-cover object-left-top"
          secondImageClassname="object-cover object-left-top"
          className="h-[250px] w-[600px] md:h-[500px] md:w-[900px]"
          slideMode="hover"
          autoplay={true}
        />
        </div>
      </div>
    </div>
  );
}
