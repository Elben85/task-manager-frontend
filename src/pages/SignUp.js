import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SignUpError } from "../components/enum";
import API from "../API/API";
import SignUpPopUp from "../components/SignUpPopUp";
import LoadingPage from "./LandingPage";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 15px;
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

const Input = styled.input`
  border: 2px solid black;
  padding: 10px;
  font-size: 16px;
`;

export default function SignUp() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [popUp, setPopUp] = useState(SignUpError.None);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  }

  //Email is considered valid if it is in the form of
  //anystring@anystring.anystring
  function validateEmail() {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(input.email);
  }

  async function handleSubmit() {
    if (!validateEmail()) {
      setPopUp(SignUpError.NotAnEmail);
    } else if (input.password !== input.confirmPassword) {
      setPopUp(SignUpError.PasswordDontMatch);
    } else {
      setIsLoading(true);
      const data = await API.post("/users/signup", {
        username: input.username,
        email: input.email,
        password: input.password
      }).then((response) => response.data);
      if (data.error === SignUpError.UsernameUnavailable) {
        setPopUp(SignUpError.UsernameUnavailable);
        setIsLoading(false);
      } else if (data.error === SignUpError.EmailUnavailable) {
        setPopUp(SignUpError.EmailUnavailable);
        setIsLoading(false);
      } else {
        navigate("/LogIn");
      }
    }
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      {popUp !== SignUpError.None && (
        <SignUpPopUp type={popUp} setPopUp={setPopUp} />
      )}
      <Container>
        <h1> Sign Up</h1>
        <FormContainer>
          <Form>
            <label>Username</label>
            <Input
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
            />
            <label> Email </label>
            <Input
              name="email"
              type="text"
              placeholder="Email"
              onChange={handleChange}
            />
            <label> Password </label>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <label> Confirm Password </label>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          </Form>
          <Submit onClick={handleSubmit}> Submit</Submit>
        </FormContainer>
        <Link to="/LogIn">
          <LogInLink>Have an Account? Log In</LogInLink>
        </Link>
      </Container>
    </>
  );
}
