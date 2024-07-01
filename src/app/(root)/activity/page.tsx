import { fetchUser, getActivity } from "@/app/(auth)/_actions/users";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const ActivityPage = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const activities = await getActivity(userInfo._id);

  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>
      <section className="mt-10 flex flex-col gap-5">
        {activities.length > 0 ? (
          <>
            {activities.map((activity) => (
              <Link key={activity._id} href={`/echo/${activity.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={activity.author.image}
                    alt="Profile picture"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="text-secondary">
                    <span className="mr-1 text-primary">
                      {activity.author.name}
                    </span>{" "}
                    replied to your echo
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="not-found">No activity yet</p>
        )}
      </section>
    </section>
  );
};

export default ActivityPage;
