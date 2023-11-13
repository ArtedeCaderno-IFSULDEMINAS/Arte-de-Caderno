import { Button } from "../sharedStyles";

const ButtonStory = (props) => {
  return <Button>
    {props.text}
  </Button>;
};

export default {
  title: "Styles/button",
  component: ButtonStory,
  tags: ["autodocs"],
};

export const Primary = {
  args: {
    width: "200px",
    bg: "black",
    color: "white",
    textTransform: "uppercase",
    text: "Exemplo"
  },
};




