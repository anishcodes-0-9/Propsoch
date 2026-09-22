import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://propsoch-redesign.vercel.app"),
  title: "Propsoch | Independent Research Before You Buy a Home",
  description:
    "Propsoch helps homebuyers investigate a property before trusting a broker's sales pitch — guided research, site visits and negotiation support across a 25-day journey.",
  openGraph: {
    title: "Propsoch | Independent Research Before You Buy a Home",
    description:
      "Guided home buying built on evidence, not sales pitches. See the reality behind the brochure.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} antialiased`}>
      <body className="flex min-h-screen flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
