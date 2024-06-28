import { sidebarLinks } from "@/constants";
import Link from "next/link";

const LeftSidebar = () => {
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex flex-col flex-1 gap-6 px-6 w-full text-secondary">
        {sidebarLinks.map((link) => (
          <div key={link.route} className="flex gap-4">
            {link.icon}
            <Link href={link.route}>{link.label}</Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeftSidebar;
