import React from "react";
import { CommunityCardProps } from "../../../../../types";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CommunityCard = ({
  id,
  name,
  username,
  imgUrl,
  bio,
  members,
}: CommunityCardProps) => {
  return (
    <article className="community-card">
      <div className="flex flex-wrap items-center gap-3">
        <Link href={`/communities/${id}`}>
          <Image
            src={imgUrl}
            alt="Community Logo"
            fill
            className="rounded-full object-cover"
          />
        </Link>
        <div>
          <Link href={`/communities/${id}`}>
            <h4 className="text-base-semibold text-secondary">{name}</h4>
          </Link>
          <p className="text-small-medium text-muted">@{username}</p>
        </div>
      </div>
      <p className="mt-4 text-subtle-medium text-muted">{bio}</p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <Link href={`/communities/${id}`}>
          <Button size="sm" className="community-card_btn">
            View
          </Button>
        </Link>

        {members.length > 0 && (
          <div className="flex items-center">
            {members.map((member, index) => (
              <Image
                key={index}
                src={member.image}
                alt={`User ${index}`}
                width={28}
                height={28}
                className={cn("rounded-full object-cover", {
                  "-ml-2": index !== 0,
                })}
              />
            ))}
            {members.length > 3 && (
              <p className="ml-1 text-subtle-medium text-muted">
                {members.length}+ Users
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default CommunityCard;
