"use client";

import Image from "next/image";
import { UserCardProps } from "../../../../../types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const UserCard = ({
  id,
  name,
  username,
  imgUrl,
  userType,
}: UserCardProps) => {
  const router = useRouter();
  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <Image
          src={imgUrl}
          alt="Logo"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-secondary">{name}</h4>
          <p className="text-small-medium text-muted">@{username}</p>
        </div>
      </div>
      <Button
        className="user-card_btn"
        onClick={() => router.push(`/profile/${id}`)}
      >
        View
      </Button>
    </article>
  );
};

export default UserCard;
