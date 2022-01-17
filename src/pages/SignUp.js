import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SignUpError } from "../components/enum";
import API from "../API/API";
import SignUpPopUp from "../components/SignUpPopUp";

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

export default function SignUp() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [usersList, setUsersList] = useState();
  const [popUp, setPopUp] = useState(SignUpError.None);
  const navigate = useNavigate();

  useEffect(async () => {
    const response = await API.get("/users");
    setUsersList(response.data);
  }, []);

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }

  //Email is considered valid if it is in the form of
  //anystring@anystring.anystring
  function validateEmail() {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(input.email);
  }

  function isUsernameUnavailable() {
    return (
      usersList.filter((user) => user.username === input.username).length > 0
    );
  }

  function isEmailUnavailable() {
    return usersList.filter((user) => user.email === input.email).length > 0;
  }

  async function handleSubmit() {
    if (!validateEmail()) {
      setPopUp(SignUpError.NotAnEmail);
    } else if (input.password !== input.confirmPassword) {
      setPopUp(SignUpError.PasswordDontMatch);
    } else if (isUsernameUnavailable()) {
      setPopUp(SignUpError.UsernameUnavailable);
    } else if (isEmailUnavailable()) {
      setPopUp(SignUpError.EmailUnavailable);
    } else {
      await API.post("/users", input).then(navigate("/LogIn"));
    }
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
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
            />
            <label> Email </label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              onChange={handleChange}
            />
            <label> Password </label>
            <input name="password" type="password" onChange={handleChange} />
            <label> Confirm Password </label>
            <input
              name="confirmPassword"
              type="password"
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
