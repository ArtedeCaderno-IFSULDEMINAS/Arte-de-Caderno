import { Title, Text } from "src/styles/sharedStyles";
import { ModalCard, ModalContent, ModalOverlay } from "./components/style";

const PasswordModal = () => {

  return (
    <ModalOverlay>
      <ModalCard>
        <Title color="black">Senha Segura</Title>
        <Text>Confira estas dicas para garantir uma senha segura:</Text>
        <ModalContent>
          
        </ModalContent>
      </ModalCard>
    </ModalOverlay>
  );
};

export default PasswordModal;
