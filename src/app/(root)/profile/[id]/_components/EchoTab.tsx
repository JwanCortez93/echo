import { fetchUserEchoes } from "@/app/(auth)/_actions/users";
import { EchoTabProps } from "../../../../../../types";
import { redirect } from "next/navigation";
import EchoCard from "@/app/(root)/_components/EchoCard";
import { fetchCommunityEchoes } from "@/app/(root)/_actions/communities";

const EchoTab = async ({
  currentUserId,
  accountId,
  accountType,
}: EchoTabProps) => {
  let result: any;

  if (accountType === "Community")
    result = await fetchCommunityEchoes(accountId);
  else result = await fetchUserEchoes(accountId);

  
  if (!result) redirect("/");
  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.echoes.map((echo: any) => (
        <EchoCard
          key={echo._id}
          id={echo._id}
          currentUserId={currentUserId || ""}
          parentId={echo.parentId}
          content={echo.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: echo.author.name,
                  image: echo.author.image,
                  id: echo.author.id,
                }
          }
          community={echo.community}
          createdAt={echo.createdAt}
          comments={echo.children}
        />
      ))}
    </section>
  );
};

export default EchoTab;
