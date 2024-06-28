import { Inter } from "next/font/google";
import "../globals.css";

import Footer from "./_components/Footer";
import RightSidebar from "./_components/RightSidebar";

import NavBar from "./_components/NavBar";
import LeftSidebar from "./_components/LeftSidebar";

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
  );
}
