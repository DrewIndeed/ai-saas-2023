"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    color: "text-sky-500",
    icon: LayoutDashboard,
  },
  {
    label: "Conversation",
    href: "/conversation",
    color: "text-violet-500",
    icon: MessageSquare,
  },
  {
    label: "Image Generation",
    href: "/image-gen",
    color: "text-pink-700",
    icon: ImageIcon,
  },
  {
    label: "Video Generation",
    href: "/video-gen",
    color: "text-orange-700",
    icon: VideoIcon,
  },
  {
    label: "Music Generation",
    href: "/music-gen",
    color: "text-emerald-700",
    icon: Music,
  },
  {
    label: "Code Generation",
    href: "/code-gen",
    color: "text-yellow-500",
    icon: Code,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="flex-1 px-3 py-2">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            Maximus
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-small group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition duration-300",
                route.href === pathname
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
