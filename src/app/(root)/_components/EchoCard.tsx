import Link from "next/link";
import { EchoCardProps } from "../../../../types/index.d";
import Image from "next/image";
import {
  CircleArrowOutUpRight,
  Heart,
  MessageCircle,
  Reply,
  Send,
  Share,
} from "lucide-react";
import { cn, formatDateString } from "@/lib/utils";

const EchoCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: EchoCardProps) => {
  return (
    <article
      className={cn("flex w-full flex-col rounded-xl", {
        "px-0 sm:px-7": isComment,
        "bg-foreground p-7": !isComment,
      })}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="echo-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-secondary text-base-semibold">
                {author.name}
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-secondary">{content}</p>
            <div
              className={cn("mt-5 flex flex-col gap-3", { "mb-10": isComment })}
            >
              <div className="flex gap-5">
                <Heart className="text-muted-foreground cursor-pointer hover:text-secondary" />
                <Link href={`/echo/${id}`}>
                  <MessageCircle className="text-muted-foreground cursor-pointer hover:text-secondary" />
                </Link>
                <CircleArrowOutUpRight className="text-muted-foreground cursor-pointer hover:text-secondary" />
                <Send className="text-muted-foreground cursor-pointer hover:text-secondary" />
              </div>
              {isComment && comments.length > 0 && (
                <Link href={`/echo/${id}`}>
                  <p className="mt-1 text-subtle-medium text-muted-foreground">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-muted">
            {formatDateString(createdAt)}- {community.name} Community
          </p>
          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className="rounded-full ml-1 object-cover"
          />
        </Link>
      )}
    </article>
  );
};

export default EchoCard;
