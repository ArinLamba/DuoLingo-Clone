import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  courseImg: string;
};

export const Header = ({ title, courseImg }: Props) => {
  return (
    <div className="sticky top-0 bg-white pb-3 lg:pt-[28px] lg:mt-[-28px] flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50">
      <Link href="/courses">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-5 w-5 stroke-2 text-purple-400"/>
        </Button>
      </Link>
      <h1 className="font-bold text-lg">
        {title}
      </h1>
      <Link
        href="/courses"
        className="lg:hidden"  
      >
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
      <div className="hidden lg:block"/>
    </div>
  );
};