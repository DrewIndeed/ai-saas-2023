import { getApiLimitCount } from "@/lib/api-limits";
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile/Sidebar";

const Navbar = async () => {
  const limitCount = await getApiLimitCount();
  return (
    <div className="flex items-center p-4 md:w-full md:fixed bottom-0 right-0">
      <MobileSidebar limitCount={limitCount} />
      <div className="flex w-full justify-end">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              userButtonAvatarBox: "w-11 h-11 select-none pointer-events-none",
              userPreviewAvatarBox: "select-none pointer-events-none",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
