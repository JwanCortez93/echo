import { currentUser } from "@clerk/nextjs/server";
import { fetchEchoes } from "./_actions/echoes";
import EchoCard from "./_components/EchoCard";

export default async function Home() {
  const result = await fetchEchoes(1, 30);
  const user = await currentUser();

  

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.echoes.length === 0 ? (
          <p className="no-result">No echoes found</p>
        ) : (
          <>
            {result.echoes.map(
              ({
                _id,
                parentId,
                text,
                author,
                community,
                createdAt,
                children,
              }) => (
                <EchoCard
                  key={_id}
                  id={_id}
                  currentUserId={user?.id || ""}
                  parentId={parentId}
                  content={text}
                  author={author}
                  community={community}
                  createdAt={createdAt}
                  comments={children}
                />
              )
            )}
          </>
        )}
      </section>
    </>
  );
}
