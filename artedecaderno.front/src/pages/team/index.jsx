import { useEffect } from "react";
import TeamView from "src/views/team";

const Team = () => {
  useEffect(() => {
    document.title = "Arte de Caderno | Equipe";
  }, []);

  return <TeamView />;
};

export default Team;
