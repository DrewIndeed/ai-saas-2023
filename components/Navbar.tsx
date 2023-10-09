import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile/Sidebar";

const Navbar = () => {
  return (
    <div className="flex items-center p-4 md:w-full md:fixed bottom-0 right-0">
      <MobileSidebar />
      <div className="flex w-full justify-end">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              userButtonAvatarBox: "w-11 h-11",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
