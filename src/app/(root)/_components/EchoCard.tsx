import Link from "next/link";
import { EchoCardProps } from "../../../../types";
import Image from "next/image";
import {
  CircleArrowOutUpRight,
  Heart,
  MessageCircle,
  Reply,
  Send,
  Share,
} from "lucide-react";

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
    <article className="flex w-full flex-col rounded-xl bg-foreground p-7">
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
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-3.5">
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
    </article>
  );
};

export default EchoCard;
