import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
  return (
    <div>
      <p>DashboardPage (protected)</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default DashboardPage;
