import Image from "next/image";

interface LoaderProps {}

const Loader = (props: LoaderProps) => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image alt="logo" src="/logo.png" fill />
      </div>
      <p className="text-sm text-muted-background">
        Maximus is thinking hard ...
      </p>
    </div>
  );
};

export default Loader;
