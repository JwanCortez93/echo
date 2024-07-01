import { currentUser } from "@clerk/nextjs/server";
import { fetchCommunityDetails } from "../../_actions/communities";
import ProfileHeader from "../../profile/[id]/_components/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { communityTabs } from "@/constants";
import EchoTab from "../../profile/[id]/_components/EchoTab";
import UserCard from "../../search/_components/UserCard";

const CommunityPage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return null;

  const { _id, id, name, username, image, bio, echoes, members } =
    await fetchCommunityDetails(params.id);

  return (
    <section>
      <ProfileHeader
        accountId={id}
        authUserId={user.id}
        name={name}
        username={username}
        imgUrl={image}
        bio={bio}
        type="Community"
      />
      <div className="mt-9">
        <Tabs defaultValue="echoes" className="w-full">
          <TabsList className="tab">
            {communityTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                {tab.icon}
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label === "Echoes" && (
                  <p className="ml-1 rounded-sm bg-background px-2 py-1 !text-tiny-medium text-primary">
                    {echoes?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent
            value="echoes"
            className="w-full
             text-secondary"
          >
            <EchoTab
              currentUserId={user.id}
              accountId={_id}
              accountType="Community"
            />
          </TabsContent>
          <TabsContent
            value="members"
            className="w-full
             text-secondary"
          >
            <section className="mt-9 flex flex-col gap-10">
              {members.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imgUrl={member.image}
                  userType="User"
                />
              ))}
            </section>
          </TabsContent>
          <TabsContent
            value="requests"
            className="w-full
             text-secondary"
          >
            <EchoTab
              currentUserId={user.id}
              accountId={_id}
              accountType="Community"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CommunityPage;
