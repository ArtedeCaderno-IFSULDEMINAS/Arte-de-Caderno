import { BrowserRouter } from "react-router-dom";
import Loading from "../index";

const LoadingStoryComponent = () => {
  return (
    <BrowserRouter>
      <Loading {...DEFAULT.args} />
    </BrowserRouter>
  );
};

export default {
  title: "components/loading",
  component: LoadingStoryComponent,
  tags: ["autodocs"],
};

export const DEFAULT = {
  args: {},
};
