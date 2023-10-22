"use client";

import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import {
  Check,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
  Zap,
} from "lucide-react";

import { useProModal } from "@/hooks/useProModal";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";

const tools = [
  {
    label: "Conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    icon: MessageSquare,
  },
  {
    label: "Image Generation",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    icon: ImageIcon,
  },
  {
    label: "Video Generation",
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    icon: VideoIcon,
  },
  {
    label: "Music Generation",
    color: "text-emerald-700",
    bgColor: "bg-emerald-700/10",
    icon: Music,
  },
  {
    label: "Code Generation",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    icon: Code,
  },
];

const ProModal = () => {
  const proModal = useProModal();

  // handle upgrade clicked
  const [isLoading, setLoading] = useState(false);
  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log("[STRIPE_CLIENT_ERROR][Upgrade Subscription Clicked]", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col justify-center items-center gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py01">
              Upgrade to Maximus
              <Badge variant="upgrade" className="uppercase text-sm py-1">
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <div className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="p-4 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  <div className="font-medium">{tool.label}</div>
                </div>
                <Check className="w-6 h-6 text-green-600" />
              </Card>
            ))}
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isLoading}
            onClick={onSubscribe}
            size="lg"
            variant="upgrade"
            className="w-full"
          >
            Upgrade Now
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
