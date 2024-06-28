"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSidebar = () => {
  const pathname = usePathname();

  return (
    <section className="custom-scrollbar leftsidebar items-center">
      <div className="flex flex-col  flex-1 gap-6 px-6 w-full text-secondary">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);
          return (
            <Link
              key={link.label}
              className={cn("leftsidebar_link", {
                "bg-primary text-accent-foreground": isActive,
              })}
              href={link.route}
            >
              {link.icon}
              <p className="max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6 ">
        <SignedIn>
          <SignOutButton redirectUrl="/">
            <div className="flex gap-2 cursor-pointer">
              <LogOut className="text-destructive" />
              <p className="max-lg:hidden text-destructive">Log Out</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
