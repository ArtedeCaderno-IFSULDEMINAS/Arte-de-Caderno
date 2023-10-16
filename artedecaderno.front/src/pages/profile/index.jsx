import { useEffect } from "react";
import ProfileView from "src/views/profile";

const Profile = () => {
  useEffect(() => {
    document.title = "Arte de Caderno | Perfil";
  }, []);

  return <ProfileView/>;
};

export default Profile;
