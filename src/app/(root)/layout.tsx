import { Inter } from "next/font/google";
import "../globals.css";

import RightSidebar from "./_components/RightSidebar";

import NavBar from "./_components/NavBar";
import LeftSidebar from "./_components/LeftSidebar";
import MobileNav from "./_components/MobileNav";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <main className="flex flex-row">
          <LeftSidebar />
          <section className="main-container">
            <div className="w-full max-w-4xl">{children}</div>
          </section>
          <RightSidebar />
        </main>
        <MobileNav />
      </body>
    </html>
  );
}
