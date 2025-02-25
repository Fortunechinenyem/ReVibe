import ProfileComponent from "@/app/components/Profile";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return <ProfileComponent user={user} />;
}
