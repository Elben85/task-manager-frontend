import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import API from "../API/API";
import { NavBar } from "./NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { TaskType } from "./enum";
import { UserContext } from "./UserContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 30px;
  padding: 20px;
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
  & > textarea {
    resize: none;
    overflow-wrap: break-word;
    -ms-word-break: break-word;
    word-wrap: break-word;
    word-break: break-word;
  }
`;

const Input = styled.input`
  padding: 5px;
  font-size: 20px;
`;

const Select = styled.select`
  padding: 5px;
  font-size: 20px;
  outline: none;
`;

export default function EditTask() {
  const { userContext } = useContext(UserContext);
  const [task, setTask] = useState(useLocation().state);
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
      [event.target.name]: event.target.value,
    });
  }

  function handleTypeChange(event) {
    setTask({
      ...task,
      taskType: event.target.value,
      schedule: "",
    });
  }

  async function handleSubmit() {
    await API.put(`/task/${task.id}`, task).then(navigate("/Tasks"));
  }

  return (
    <>
      <NavBar />
      <Container>
        <Form>
          <label> Task Name </label>
          <InputTitle
            name="taskName"
            type="text"
            onChange={handleChange}
            value={task.taskName}
          />
          <label> Description </label>
          <InputDesc
            name="description"
            type="text"
            onChange={handleChange}
            value={task.description}
          />
          <label> Tags </label>
          <Input
            name="tags"
            type="text"
            onChange={handleChange}
            value={task.tags}
          />
          <label> Schedule </label>
          <Select onChange={handleTypeChange} value={task.taskType}>
            <option value={TaskType.OneTime}> One Time</option>
            <option value={TaskType.Daily}> Daily </option>
            <option value={TaskType.Weekly}> Weekly </option>
          </Select>
          <label> Schedule </label>
          {task.taskType === TaskType.OneTime ? (
            <Input
              name="schedule"
              type="date"
              onChange={handleChange}
              value={task.schedule}
            />
          ) : task.taskType === TaskType.Daily ? (
            <Input
              name="schedule"
              type="time"
              onChange={handleChange}
              value={task.schedule}
            />
          ) : (
            <Select
              name="schedule"
              onChange={handleChange}
              value={task.schedule}
            >
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
          <Submit onClick={handleSubmit}> Update </Submit>
        </Form>
      </Container>
    </>
  );
}
