import {
  Heart,
  Home,
  Search,
  Speech,
  UserSquare,
  UsersRound,
} from "lucide-react";

export const sidebarLinks: SidebarLinkType[] = [
  {
    icon: <Home />,
    route: "/",
    label: "Home",
  },
  {
    icon: <Search />,
    route: "/search",
    label: "Search",
  },
  {
    icon: <Heart />,
    route: "/activity",
    label: "Activity",
  },
  {
    icon: <Speech />,
    route: "/create-echo",
    label: "Create Echo",
  },
  {
    icon: <UsersRound />,
    route: "/communities",
    label: "Communities",
  },
  {
    icon: <UserSquare />,
    route: "/profile",
    label: "Profile",
  },
];
