import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "./_components/Footer";
import RightSidebar from "./_components/RightSidebar";
import LeftSidebar from "./_components/LeftSideBar";
import NavBar from "./_components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Echo",
  description: "Your Voice, Amplified",
  icons: {
    icon: "/logo/png/echo-favicon-color.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <NavBar />
          <main>
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSidebar />
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
