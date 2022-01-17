import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./UserContext";

const Container = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  display: flex;
  column-gap: 40px;
  background: black;
  color: white;
  padding: 20px 30px;
  font-size: 20px;
  border-bottom: 3px solid white;
`;

const Pages = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  color: white;
  &:hover {
    color: cyan;
    transition: 0.2s;
    scale: 1.1;
    cursor: pointer;
  }
`;

const Username = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  color: white;
  margin-left: auto;
  padding-right: 80px;
`;

export function NavBar() {
  const { userContext } = useContext(UserContext);

  return (
    <Container>
      <Link to="/Tasks">
        <Pages>Tasks</Pages>
      </Link>

      <Link to="/SignOut">
        <Pages>Sign Out</Pages>
      </Link>

      <Username> {userContext.username}</Username>
    </Container>
  );
}
