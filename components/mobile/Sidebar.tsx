"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import Sidebar from "../Sidebar";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

interface MobileSidebarProps {
  limitCount: number;
}

const MobileSidebar = ({ limitCount }: MobileSidebarProps) => {
  const [isMounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger>
        <Button asChild variant="ghost" size="icon" className="md:hidden p-2">
          <Menu className="w-10 h-10" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar limitCount={limitCount} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
