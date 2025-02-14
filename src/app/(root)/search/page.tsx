import { fetchUser, fetchUsers } from "@/app/(auth)/_actions/users";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import UserCard from "./_components/UserCard";

const SearchPage = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>
      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No users</p>
        ) : (
          <>
            {result.users.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                username={user.username}
                imgUrl={user.image}
                userType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
