import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NavBar } from "../components/NavBar";
import { UserContext } from "../components/UserContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0px;
`;

const Header = styled.h1`
  font-size: 60px;
`;

const Confirm = styled.button`
  transition: 0.2s;
  padding: 10px 50px;
  background: black;
  color: white;
  border: 3px solid white;
  font-size: 40px;
  &:hover {
    transition: 0.2s;
    color: cyan;
    border: none;
    box-shadow: 0px 0px 10px 10px cyan;
    scale: 1.2;
`;

export default function SignOut() {
  const { userContext, setUserContext } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userContext.isLoggedIn) {
      return;
    }
    navigate("/");
  }, []);

  function handleConfirmClick() {
    setUserContext({
      isLoggedIn: false,
      userId: "",
      username: "",
    });
    navigate("/LogIn");
  }

  return (
    <>
      <NavBar />
      <Container>
        <Header> Press Confirm To SignOut</Header>
        <Confirm onClick={handleConfirmClick}> Confirm </Confirm>
      </Container>
    </>
  );
}
