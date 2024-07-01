import { currentUser } from "@clerk/nextjs/server";
import AccountProfileForm from "../_components/AccountProfileForm";
import { fetchUser } from "../_actions/users";
import { redirect } from "next/navigation";

const OnboardingPage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    userName: userInfo ? userInfo?.username : user?.username,
    name: userInfo ? userInfo?.name : user?.firstName || "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user?.imageUrl,
  };
  return (
    <main className="mx-auto h-screen flex flex-col justify-start px-10 py-20 max-w-3xl bg-foreground">
      <h1 className="head-text text-secondary-foreground">Onboarding</h1>
      <p className="mt-3 text-base-regular text-secondary">
        Complete your profile now to use Echo
      </p>

      <section className="mt-9 bg-background p-10">
        <AccountProfileForm user={userData} buttonTitle="Continue" />
      </section>
    </main>
  );
};

export default OnboardingPage;
