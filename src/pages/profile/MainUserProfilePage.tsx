import UserProfileForm from "@/components/profile/UserProfileForm";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { fetcher } from "@/lib/utils";
import { useQuery } from "react-query";

const MainUserProfilePage = () => {
  const { authUser } = useAuthContext();
  const userId = authUser?.id;

  const { data } = useQuery({
    queryKey: ["UserProfile", userId],
    queryFn: () => fetcher("/api/user/profile"),
    refetchOnWindowFocus:false
  });

  if (!data) {
    return <p>Loading</p>;
  }
  console.log(data);

  return (
    <section className="py-10">
      <div className="container">
        <h1 className="text-center">Profile Page</h1>
        <UserProfileForm data={data} userId={userId!} />
      </div>
    </section>
  );
};

export default MainUserProfilePage;
