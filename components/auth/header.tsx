import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

type HeaderProps = {
  label: string;
};

export const Header = ({ label }: HeaderProps) => {
  return (
    <header className="flex w-full flex-col justify-center gap-y-4 items-center">
      <h1 className={cn(font.className, "text-3xl font-semibold ")}>Auth</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </header>
  );
};
