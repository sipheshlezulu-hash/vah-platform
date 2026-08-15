import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VAH Afrika — Creation Is Sacred",
  description: "A movement for African creators, builders, thinkers and dreamers.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
