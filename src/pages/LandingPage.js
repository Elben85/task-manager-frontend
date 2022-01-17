import styled from "styled-components";
import { Link } from "react-router-dom";

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const SubTitle = styled.h2`
  font-size: 40px;
  font-weight: normal;
`;

const Option = styled.button`
  transition: 0.2s;
  font-size: 20px;
  width: 200px;
  color: white;
  background: black;
  border: 3px solid white;
  padding: 10px;
  &:hover {
    transition: 0.2s;
    color: cyan;
    border: none;
    box-shadow: 0px 0px 6px 6px cyan;
    scale: 1.2;
  }
`;

export default function LandingPage() {
  return (
    <>
      <Title> Task Manager App </Title>
      <SubTitle> A Better Way To Manage Tasks </SubTitle>
      <OptionContainer>
        <Link to="/SignUp">
          <Option> Sign Up </Option>
        </Link>

        <Link to="LogIn">
          <Option> Log In </Option>
        </Link>
      </OptionContainer>
    </>
  );
}
