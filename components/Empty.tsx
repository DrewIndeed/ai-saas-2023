import Image from "next/image";

interface EmptyProps {
  label: string;
}

const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center select-none pointer-events-none">
      <div className="w-72 h-72 relative">
        <Image
          alt="empty"
          src="/empty.png"
          sizes="(max-width: 1400px) 100vw, 1400px"
          fill
        />
      </div>
      <p className="text-muted-foreground text-sm text-center font-semibold">
        {label}
      </p>
    </div>
  );
};

export default Empty;
