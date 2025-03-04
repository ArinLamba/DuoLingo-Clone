import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const buttonUpContent = (
    <Button size="lg" variant="secondary" className="w-full">
      Get Started
    </Button>
  );

  const buttonInContent = (
    <Button size="lg" variant="primaryOutline" className="w-full">
      I already have an account
    </Button>
  );

  return (
    <div className="max-2-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[250px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src="hero.svg" fill alt="Hero" />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-2-[480px] text-center">
          Learn, Practice, and master new Languages with Lingo.
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton 
                mode="modal" 
                forceRedirectUrl="/learn"
              >
                {buttonUpContent}
              </SignUpButton>
              <SignInButton 
                mode="modal" 
                forceRedirectUrl="/learn"
              >
                {buttonInContent}
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button
                size="lg"
                variant={"secondary"}
                className="w-full"
                asChild
              >
                <Link href="/learn">Continue Learning</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
