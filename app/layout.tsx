import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/sonner';
import { ExitModal } from '@/components/modals/exit-modal';
import { HeartsModal } from '@/components/modals/hearts-modal';
import { PracticeModal } from "@/components/modals/practice-modal";

import "./globals.css";

const font = Nunito({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Lingo",
  description: 
    "Lingo is a dynamic language learning app inspired by Duolingo, offering interactive lessons, personalized progress tracking, and engaging challenges to help you master new languages. With a sleek and user-friendly design, Lingo makes language learning fun, accessible, and efficient for all levels. Start your language learning journey today with Lingo and unlock your potential to speak multiple languages fluently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={font.className} > 
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
