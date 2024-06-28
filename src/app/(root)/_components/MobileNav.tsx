"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="mobileNav">
      <div className="mobileNav_container">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);
          return (
            <Link
              key={link.label}
              className={cn("leftsidebar_link items-center", {
                "bg-primary text-accent-foreground": isActive,
              })}
              href={link.route}
            >
              {link.icon}
              <p className="text-subtle-medium  max-sm:hidden">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default MobileNav;
