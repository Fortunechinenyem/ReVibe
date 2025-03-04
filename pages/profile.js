import Navbar from "@/app/components/Navbar";
import ProfileComponent from "@/app/components/Profile";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <section className="py-15">
        {" "}
        <ProfileComponent user={user} />
      </section>
    </>
  );
}
