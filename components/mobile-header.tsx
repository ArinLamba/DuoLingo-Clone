import { MobileSidebar } from "@/components/mobile-sidebar";
import Image from "next/image";


export const MobileHeader = () => {
  return (
    <nav className="lg:hidden px-6 h-[50px] flex items-center bg-green-600 border-b fixed top-0 w-full z-50">
      <MobileSidebar />
      <div className="left-1/2 absolute -translate-x-1/2 flex items-center gap-x-3">
        <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
        <h1 className="text-2xl font-extrabold text-muted tracking-wide">
          Lingo
        </h1>
      </div>
    </nav>
  );
};

