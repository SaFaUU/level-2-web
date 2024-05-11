import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      {session?.user && (
        <>
          <h1 className="text-4xl text-center mt-10">
            Welcome {session?.user?.name}
          </h1>
          <h1 className="text-4xl text-center mt-10">
            Logged-in user email {session?.user?.email}
          </h1>
          <img
            src={session?.user?.image || "https://i.pravatar.cc/300"}
            alt=""
            width={200}
            height={200}
            className="mx-auto rounded-full mt-5"
          />
        </>
      )}
    </div>
  );
};

export default DashboardPage;
