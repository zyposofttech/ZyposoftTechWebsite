import Image from "next/image";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/icons/Zyposoft.svg"
      alt="ZypoSoft Logo"
      width={360}
      height={180}
      priority
      className={`h-[46px] sm:h-[52px] md:h-[64px] w-auto object-contain ${className ?? ""}`}
    />
  );
}
