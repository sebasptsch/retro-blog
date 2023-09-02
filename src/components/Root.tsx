import { Comic_Neue, Fira_Code, Inter } from "next/font/google";

interface RootProps {
  children?: React.ReactNode;
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

const comicSans = Comic_Neue({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-comic-sans",
  weight: "400",
});

export default function Root({ children }: RootProps) {
  return (
    <div
      className={`flex-col flex h-screen font-inter ${inter.variable} ${firaCode.variable} ${comicSans.variable}`}
    >
      {children}
    </div>
  );
}
