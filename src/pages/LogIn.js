import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import API from "../API/API";
import { UserContext } from "../components/UserContext";
import WrongPasswordPopUp from "../components/WrongPasswordPopUp";
import LoadingPage from "./LoadingPage";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 20px;
  min-height: 100vh;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  width: fit-content;
  background: white;
  font-size: 30px;
  align-items: center;
  row-gap: 20px;
  padding: 20px;
  border: 3px solid black;
  box-shadow: 0px 0px 10px 10px cyan;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
`;

const Input = styled.input`
  border: 2px solid black;
  padding: 10px;
  font-size: 16px;
`;

const LogInLink = styled.div`
  transition: 0.2s;
  color: white;
  &:hover {
    color: #1f51ff;
  }
`;

const Submit = styled.button`
  transition: 0.2s;
  width: 150px;
  height: 50px;
  padding: 10px;
  background: white;
  border: 3px solid black;
  &: hover {
    transition: 0.2s;
    background: black;
    border: 3px solid white;
    box-shadow: 0px 0px 5px 5px cyan;
    scale: 1.1;
    color: cyan;
  }
`;

export default function LogIn() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [showPopUp, setShowPopUp] = useState(false);
  const { setUserContext } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    setIsLoading(true);
    const response = await API.post("/users/login", credentials);
    if (Object.keys(response.data).length === 0) {
      setShowPopUp(true);
    } else {
      const user = {
        isLoggedIn: true,
        userId: response.data.userId,
        username: response.data.username,
        token: response.data.token
      };
      setUserContext(user);
      localStorage.setItem("token", response.data.token);
      navigate("/Tasks");
    }
    setIsLoading(false);
  }

  function handleChange(event) {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    });
  }

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <>
      <Container>
        {showPopUp && <WrongPasswordPopUp setShowPopUp={setShowPopUp} />}
        <h1> Log In </h1>
        <FormContainer>
          <Form>
            <label>Username</label>
            <Input
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
            />
            <label> Password </label>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </Form>
          <Submit onClick={handleSubmit}>Log In</Submit>
        </FormContainer>
        <Link to="/SignUp">
          <LogInLink> New User? Sign Up Here </LogInLink>
        </Link>
      </Container>
    </>
  );
}
