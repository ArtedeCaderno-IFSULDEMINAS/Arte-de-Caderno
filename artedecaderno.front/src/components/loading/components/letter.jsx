import { Text } from "src/styles/sharedStyles";
import { LetterBox } from "./styles";
import { fonts } from "src/styles/constants";

const Letter = ({ letter }) => {
  if (letter !== " ") {
    return (
      <LetterBox>
        <Text
          font={fonts.league}
          style={{ fontWeight: 600, textTransform: "uppercase" }}
        >
          {letter}
        </Text>
      </LetterBox>
    );
  } else {
    <LetterBox style={{backgroundColor: "white"}} />
  }
};

export default Letter;
