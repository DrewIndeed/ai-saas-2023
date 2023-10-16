"use client";

import { useEffect, useState } from "react";

import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

import { MAX_FREE_COUNT } from "@/constants";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/useProModal";

interface FreeCounterProps {
  limitCount: number;
}

const FreeCounter = ({ limitCount = 0 }: FreeCounterProps) => {
  const proModal = useProModal();
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {limitCount} / {MAX_FREE_COUNT} Free Generations
            </p>
            <Progress
              className="h-3"
              value={(limitCount / MAX_FREE_COUNT) * 100}
            />
          </div>
          <Button
            onClick={proModal.onOpen}
            className="w-full"
            variant="upgrade"
          >
            Upgrade to Pro <Zap className="h-4 w-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
