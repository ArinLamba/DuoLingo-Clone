import { Button } from "@/components/ui/button";
import { InfinityIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  courseImg: string;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const MobileHeader = ({ 
  courseImg,
  hearts,
  points,
  hasActiveSubscription
 }: Props) => {
  return (
    <div className="sticky top-0 bg-white pb-3 md:pt-[28px] md:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 md:z-50">
      <Link href="/courses">
        <Button variant="ghost" size="sm">
          <Image
            src={courseImg}
            alt="Course"
            height={32}
            width={32}
            className="rounded-md border"
          />
        </Button>
      </Link>


      <Link href="/shop">
        <Button variant="ghost" className="text-orange-500">
          <Image src="/points.svg" height={28} width={28} alt="Points" className="mr-2" />
          {points}
        </Button>
      </Link>


      <Link href="/shop">
        <Button variant="ghost" className="text-rose-500">
          <Image src="/heart.svg" height={22} width={22} alt="Hearts" className="mr-2" />
          { hasActiveSubscription ?  <InfinityIcon className="h-4 w-4 stroke-[3]"/> : hearts }
        </Button>
      </Link>
      <div className="hidden md:block"/>
    </div>
  );
};