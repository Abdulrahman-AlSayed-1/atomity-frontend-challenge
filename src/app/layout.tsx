import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";

export const metadata: Metadata = {
 title: "Atomity — Multi-Cloud Intelligence Hub",
 description:
 "Visualize, optimize, and reduce cloud infrastructure costs across AWS, Azure, GCP, and on-premise in real time.",
 keywords: ["cloud optimization", "kubernetes", "cost management", "multi-cloud"],
 openGraph: {
 title: "Atomity — Multi-Cloud Intelligence Hub",
 description: "Unified cloud cost intelligence across every provider.",
 type: "website",
 },
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
 <html lang="en" data-theme="dark" suppressHydrationWarning>
 <body>
 <QueryProvider>{children}</QueryProvider>
 </body>
 </html>
 );
}
