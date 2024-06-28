import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link href="/" className="hidden items-center gap-1 lg:flex">
        <Image
          src={"/logo/svg/logo-no-background.svg"}
          width={200}
          height={200}
          alt="Echo Logo"
        />
      </Link>
      <Link href="/" className="lg:hidden flex items-center gap-1">
        <Image
          src={"/logo/png/echo-favicon-color.png"}
          width={50}
          height={50}
          alt="Echo Logo"
        />
      </Link>
      <div className="flex items-center gap-1">
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <LogOut className="text-destructive" />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
