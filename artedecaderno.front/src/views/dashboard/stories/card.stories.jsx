import { icons } from "src/styles/icons";
import DashboardCard from "../components/card";
import { BrowserRouter } from "react-router-dom";

const CardStoryComponent = () =>{
  return(
    <BrowserRouter>
      <DashboardCard {...CardStory.args} />
    </BrowserRouter>
  )
}

export default {
  title: "Dashboard/Card",
  component: CardStoryComponent,
  tags: ["autodocs"],
};

export const CardStory = {
  args: {
    title: "Card Title",
    icon: icons["book"],
    value: "0",
    desktop: false,
    path: "/",
  },
};


