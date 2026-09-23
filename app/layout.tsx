import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Single weight, italic only — used on a handful of accent words, never body text.
const instrumentSerif = Instrument_Serif({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://propsoch-chi.vercel.app"),
  title: "Propsoch | Independent Research Before You Buy a Home",
  description:
    "Propsoch helps homebuyers investigate a property before trusting a broker's sales pitch — guided research, site visits and negotiation support across a 25-day journey.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Propsoch | Independent Research Before You Buy a Home",
    description:
      "Guided home buying built on evidence, not sales pitches. See the reality behind the brochure.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "Propsoch | Independent Research Before You Buy a Home",
    description:
      "Guided home buying built on evidence, not sales pitches. See the reality behind the brochure.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${instrumentSerif.variable} antialiased`}>
      <body className="flex min-h-screen flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
