"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

const LandingHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="text-primary font-bold py-28 text-center space-y-3">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1 className="">The Best AI Tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 pb-2">
          <TypewriterComponent
            options={{
              strings: [
                "Conversation.",
                "Music Generation.",
                "Image Generation.",
                "Video Generation.",
                "Code Generation.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-md font-normal text-zinc-500">
        Generative content made <span className="font-semibold">10x</span>{" "}
        easier than ever.
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="upgrade"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Start Now For Free
          </Button>
        </Link>
      </div>
      <div className="font-normal text-xs md:text-sm text-zinc-400">
        No credit card reqiured.
      </div>
    </div>
  );
};

export default LandingHero;
