import Image from "next/image";
import { ProfileHeaderProps } from "../../../../../../types";

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type
}: ProfileHeaderProps) => {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="Profile image"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-secondary">
              {name}
            </h2>
            <p className="text-base-medium text-muted">@{username}</p>
          </div>
        </div>
      </div>
      <p className="mt-6 max-w-lg text-base-regular text-secondary">{bio}</p>
      <div className="mt-12 h-0.5 w-full bg-foreground" />
    </div>
  );
};

export default ProfileHeader;
