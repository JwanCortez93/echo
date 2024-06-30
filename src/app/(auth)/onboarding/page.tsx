import { currentUser } from "@clerk/nextjs/server";
import AccountProfileForm from "../_components/AccountProfileForm";

const OnboardingPage = async () => {
  const user = await currentUser();

  const userInfo = {};
  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    userName: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
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
