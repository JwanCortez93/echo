import {
  Heart,
  Home,
  MessageCircle,
  MessageCircleQuestion,
  Search,
  Speech,
  Tags,
  Users,
  UserSquare,
  UsersRound,
} from "lucide-react";
import { SidebarLinkType, Tab } from "../../types/index.d";

export const sidebarLinks: SidebarLinkType[] = [
  {
    icon: <Home />,
    route: "/",
    label: "Home",
  },
  {
    icon: <Speech />,
    route: "/create-echo",
    label: "Create Echo",
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

export const profileTabs: Tab[] = [
  { value: "echoes", label: "Echoes", icon: <Speech /> },
  { value: "replies", label: "Replies", icon: <MessageCircle /> },
  { value: "tagged", label: "Tagged", icon: <Tags /> },
];
export const communityTabs: Tab[] = [
  { value: "echoes", label: "Echoes", icon: <Speech /> },
  { value: "members", label: "Members", icon: <Users /> },
  { value: "requests", label: "Requests", icon: <MessageCircleQuestion /> },
];
