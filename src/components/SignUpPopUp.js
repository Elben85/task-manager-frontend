import styled, { keyframes } from "styled-components";
import { SignUpError } from "./enum";

const fadeIn = keyframes`
from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1000;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background: #00000099;
  animation-name: ${fadeIn};
  animation-duration: 0.5s;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  color: black;
  width: 400px;
  height: 125px;
  padding: 20px;
  border: 5px solid red;
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 30px;
`;

const Option = styled.div`
  transition: 0.2s;
  font-size: 20px;
  width: 150px;
  color: white;
  background: black;
  border: 3px solid white;
  padding: 10px;
  &:hover {
    transition: 0.2s;
    color: cyan;
    border: none;
    box-shadow: 0px 0px 3px 3px cyan;
    scale: 1.1;
  }
`;

export default function SignUpPopUp({ type, setPopUp }) {
  function handleContinueClick() {
    setPopUp(SignUpError.None);
  }

  const message =
    type === SignUpError.NotAnEmail
      ? "Not a Valid Email"
      : type === SignUpError.PasswordDontMatch
      ? "Warning: Passwords Don't Match"
      : type === SignUpError.UsernameUnavailable
      ? "Username has been taken"
      : "Email has been taken";

  return (
    <Container>
      <Card>
        <p> {message} </p>
        <Options>
          <Option onClick={handleContinueClick}> Continue </Option>
        </Options>
      </Card>
    </Container>
  );
}
