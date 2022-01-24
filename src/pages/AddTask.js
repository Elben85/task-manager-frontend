import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import API from "../API/API";
import { NavBar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import { Categories, TaskType } from "../components/enum";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 30px;
  padding: 80px 20px;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-items: flex-start;
  font-size: 25px;
  width: 90%;
`;

const Submit = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  width: 150px;
  height: 50px;
  padding: 10px;
  background: white;
  border: 3px solid black;
  font-size: 20px;
  &: hover {
    transition: 0.2s;
    background: black;
    border: 3px solid white;
    box-shadow: 0px 0px 5px 5px cyan;
    scale: 1.1;
    color: cyan;
  }
`;

const InputTitle = styled.input`
  font-size: 20px;
  padding: 5px;
  width: 100%;
  outline: none;
`;

const InputDesc = styled.textarea`
  display: flex;
  overflow-wrap: break-word;
  align-items: flex-start;
  font-size: 20px;
  padding: 5px;
  width: 100%;
  height: 200px;
  rezise: none;
  outline: none;
`;

const Input = styled.input`
  padding: 5px;
  font-size: 20px;
  outline: none;
`;

const Select = styled.select`
  padding: 5px;
  font-size: 20px;
  outline: none;
`;

export default function AddTask() {
  const { userContext } = useContext(UserContext);
  const [task, setTask] = useState({
    userId: userContext.userId,
    taskName: "",
    description: "",
    tags: Categories.General,
    schedule: "",
    taskType: TaskType.OneTime
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (userContext.isLoggedIn) {
      return;
    }
    navigate("/");
  }, []);

  function handleChange(event) {
    setTask({
      ...task,
      [event.target.name]: event.target.value
    });
  }

  function handleTypeChange(event) {
    setTask({
      ...task,
      taskType: event.target.value,
      schedule: ""
    });
  }

  async function handleSubmit() {
    await API.post("/task", task).then(navigate("/Tasks"));
  }

  return (
    <>
      <NavBar />
      <Container>
        <Form>
          <label> Task Name </label>
          <InputTitle name="taskName" type="text" onChange={handleChange} />
          <label> Description </label>
          <InputDesc name="description" type="text" onChange={handleChange} />
          <label> Tags </label>
          <Select name="tags" onChange={handleChange}>
            <option value={Categories.General}> General </option>
            <option value={Categories.Health}> Health </option>
            <option value={Categories.Career}> Career </option>
            <option value={Categories.Relationship}> Relationship </option>
            <option value={Categories.Learning}> Learning </option>
            <option value={Categories.Enjoyment}> Enjoyment </option>
            <option value={Categories.Others}> Others </option>
          </Select>
          <label> Type </label>
          <Select onChange={handleTypeChange}>
            <option value={TaskType.OneTime}> One Time</option>
            <option value={TaskType.Daily}> Daily </option>
            <option value={TaskType.Weekly}> Weekly </option>
          </Select>
          <label> Schedule </label>
          {task.taskType === TaskType.OneTime ? (
            <Input name="schedule" type="date" onChange={handleChange} />
          ) : task.taskType === TaskType.Daily ? (
            <Input name="schedule" type="time" onChange={handleChange} />
          ) : (
            <Select name="schedule" onChange={handleChange}>
              <option value={""}> </option>
              <option value={"Monday"}> Monday </option>
              <option value={"Tuesday"}> Tuesday </option>
              <option value={"Wednesday"}> Wednesday </option>
              <option value={"Thursday"}> Thursday </option>
              <option value={"Friday"}> Friday </option>
              <option value={"Saturday"}> Saturday </option>
              <option value={"Sunday"}> Sunday </option>
            </Select>
          )}
          <Submit onClick={handleSubmit}> Add </Submit>
        </Form>
      </Container>
    </>
  );
}
