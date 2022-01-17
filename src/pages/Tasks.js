import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { NavBar } from "../components/NavBar";
import { TasksTable } from "../components/TasksTable";
import { Link, useNavigate } from "react-router-dom";
import API from "../API/API";
import { UserContext } from "../components/UserContext";
import SearchBar from "../components/SearchBar";
import { SearchMethod } from "../components/enum";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 20px;
  padding: 80px 10px;
  width: 100%;
`;

const Option = styled.button`
  transition: 0.2s;
  border: 3px solid white;
  background: black;
  padding: 10px;
  color: white;
  font-size: 20px;

  &: hover{
      transition 0.2s;
      scale: 1.1;
      border: 3px solid #1F51FF;
      color: cyan;
      box-shadow: 0px 0px 0px 5px cyan;
  }
`;

export default function Tasks() {
  const { userContext } = useContext(UserContext);
  const [task, setTask] = useState([]);
  const [searchMethod, setSearchMethod] = useState(SearchMethod.ByTitle);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const getTask = async () =>
    API.get("/task").then((response) => {
      setTask(
        response.data.filter((task) => task.userId === userContext.userId)
      );
    });

  useEffect(() => {
    if (userContext.isLoggedIn) {
      return;
    }
    navigate("/");
  }, []);

  useEffect(getTask, []);

  const filteredTask =
    searchMethod === SearchMethod.ByTitle
      ? task.filter((elem) => elem.taskName.includes(searchInput))
      : task.filter((elem) => elem.tags.includes(searchInput));

  return (
    <>
      <NavBar />
      <Container>
        <SearchBar
          setSearchMethod={setSearchMethod}
          setSearchInput={setSearchInput}
        />
        <Link to="/AddTask">
          <Option> Add Task</Option>
        </Link>
        <TasksTable task={filteredTask} setTask={setTask} />
      </Container>
    </>
  );
}
