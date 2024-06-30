import { fetchUser } from "@/app/(auth)/_actions/users";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import PostEcho from "./_components/PostEcho";

const CreateEchoPage = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create Echo</h1>
      <PostEcho userId={userInfo._id} />
    </>
  );
};

export default CreateEchoPage;
