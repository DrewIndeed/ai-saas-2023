import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getApiLimitCount } from "@/lib/api-limits";
import { checkSubscription } from "@/lib/subscription";
import { ReactNode } from "react";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const limitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 z-[50] bg-gray-900">
        <Sidebar isPro={isPro} limitCount={limitCount} />
      </div>
      <main className="md:pl-72 md:mt-6">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
