import { currentUser } from "@clerk/nextjs/server";
import EchoCard from "../../_components/EchoCard";
import { fetchUser } from "@/app/(auth)/_actions/users";
import { redirect } from "next/navigation";
import { fetchEchoById } from "../../_actions/echoes";
import Comment from "./_components/Comment";

const EchoPage = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const { _id, id, parentId, text, author, community, createdAt, children } =
    await fetchEchoById(params.id);

  return (
    <section className="relative">
      <div>
        <EchoCard
          id={_id}
          currentUserId={user?.id || ""}
          parentId={parentId}
          content={text}
          author={author}
          community={community}
          createdAt={createdAt}
          comments={children}
        />
      </div>
      <div className="mt-7">
        <Comment
          echoId={id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>
    </section>
  );
};

export default EchoPage;
