"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversation",
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    icon: MessageSquare,
  },
  {
    label: "Image Generation",
    href: "/image-gen",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    icon: ImageIcon,
  },
  {
    label: "Video Generation",
    href: "/video-gen",
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    icon: VideoIcon,
  },
  {
    label: "Music Generation",
    href: "/music-gen",
    color: "text-emerald-700",
    bgColor: "bg-emerald-700/10",
    icon: Music,
  },
  {
    label: "Code Generation",
    href: "/code-gen",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    icon: Code,
  },
];

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 md:pt-12 space-y-2">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Hello from Maximus AI 👽
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          A sip of the smartest AI - Assist you with anything!
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
