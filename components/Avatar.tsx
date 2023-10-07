import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface CustomAvatarProps {
  type: "user" | "bot";
}

const CustomAvatar = ({ type }: CustomAvatarProps) => {
  const { user } = useUser();
  return (
    <Avatar className={cn("h-10 w-10", type === "bot" && "p-1")}>
      {type === "user" && (
        <>
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </AvatarFallback>
        </>
      )}
      {type === "bot" && <AvatarImage src="/logo.png" />}
    </Avatar>
  );
};

export default CustomAvatar;
