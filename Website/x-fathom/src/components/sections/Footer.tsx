"use client";
import { LampContainer } from "../ui/lamp";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  return (
    <LampContainer>
      {/* Wrap content in a container that resets the translation */}
      <div className="flex flex-col items-center translate-y-80">
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="font-outfit mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          <span>Hey </span> 
          <div className="relative inline-block bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
          <span className="">iamvevaar</span>

        </div>
        <div>

        creative software engineer
            </div>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 flex justify-center"
        >
          <Image
            src="/images/goutput.gif" // Replace with your GIF filename
            alt="Animated graphic"
            width={250}  // Adjust width as needed
            height={250} // Adjust height as needed
            className="rounded-full"
          />
        </motion.div>
      </div>
    </LampContainer>
  );
}
