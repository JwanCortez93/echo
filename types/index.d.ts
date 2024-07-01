import { UserValidation } from "@/lib/validations/user";
import { SortOrder } from "mongoose";
import { ReactElement } from "react";
import { Control } from "react-hook-form";
import { z } from "zod";

declare type SidebarLinkType = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  route: string;
  label: string;
};

declare type AccountProfileFormProps = {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  buttonTitle: string;
};

declare type TextFormFieldProps = {
  control: Control<z.infer<typeof UserValidation | typeof EchoValidation>>;
  name: string;
  label: string | ReactElement;
  placeholder: string;
  isTextarea: boolean;
};

declare type UpdateUserParams = {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
};

declare type CreateEchoParams = {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
};

declare type EchoCardProps = {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: { author: { image: string } }[];
  isComment?: boolean;
};

declare type CommentProps = {
  echoId: string;
  currentUserImg: string;
  currentUserId: string;
};

declare type ProfileHeaderProps = {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: "User" | "Community";
};

declare type Tab = {
  value: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

declare type EchoTabProps = {
  currentUserId: string;
  accountId: string;
  accountType: string;
};

declare type FetchUsersParams = {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
};

declare type FetchCommunitiesParams = {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
};

declare type UserCardProps = {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  userType: string;
};

declare type CreateCommunityParams = {
  id: string;
  name: string;
  username: string;
  image: string;
  bio: string;
  createdById: string;
};

declare type UpdateCommunityInfoParams = {
  communityId: string;
  name: string;
  username: string;
  image: string;
};

declare type CommunityCardProps = {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: { image: string }[];
};
