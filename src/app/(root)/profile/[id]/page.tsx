import { fetchUser } from "@/app/(auth)/_actions/users";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProfileHeader from "./_components/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import EchoTab from "./_components/EchoTab";

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(params.id);

  if (!userInfo?.onboarded) redirect("/onboarding");
  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />
      <div className="mt-9">
        <Tabs defaultValue="echoes" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger className="tab" key={tab.label} value={tab.value}>
                {tab.icon}
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label === "Echoes" && (
                  <p className="ml-1 rounded-sm bg-background px-2 py-1 !text-tiny-medium text-primary">
                    {userInfo?.echoes?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-secondary"
            >
              <EchoTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ProfilePage;
