import React from "react";
import styled from "styled-components";
import editIcon from "../image/edit.png";
import deleteIcon from "../image/delete.png";
import { useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";
import { useNavigate } from "react-router-dom";
import TaskCell from "./TaskCell";

const Tasklist = styled.div`
  display: flex;
  flex-direction: column;
  border-collapse: collapse;
  width: 98vw;
  align-self: center;
  row-gap: 6px;
  font-size: 25px;
`;
const Row = styled.div`
  width: 100%
  border: 2px solid black;
  display: flex;
  background: black;
  color:white;
  box-shadow: 0px 0px 4px 0px white;
  border-radius: 10px;
`;

const TaskHeader = styled.div`
  border: 3px solid #004eff;
  padding: 10px 76px 10px 10px;
  flex: 1 1 auto;
  overflow-wrap: break-word;
  -ms-word-break: break-word;
  word-wrap: break-word;
  word-break: break-word;
  border-radius: 10px 0px 0px 10px;
`;

const ToDo = styled.div`
  border: 3px solid #004eff;
  padding: 10px;
  flex: 1 1 auto;
  overflow-wrap: break-word;
  -ms-word-break: break-word;
  word-wrap: break-word;
  word-break: break-word;
  border-radius: 10px 0px 0px 10px;
`;
const Schedule = styled.div`
  border: 3px solid #004eff;
  padding: 10px;
  width: 200px;
  flex: 0 0 auto;
`;

const Options = styled.div`
  display: flex;
  border: 3px solid #004eff;
  padding: 10px;
  width: 200px;
  flex: 0 0 auto;
  justify-content: center;
  align-items: flex-start;
  column-gap: 20px;
  border-radius: 0px 10px 10px 0px;
`;

const EditIcon = styled.img`
  transition: 0.2s;
  width: 50px;
  height: 50px;
  border: 3px solid white;
  border-radius: 100%;
  &:hover {
    transition: 0.2s;
    scale: 1.1;
    box-shadow: 0px 0px 5px 5px cyan;
  }
`;

const DeleteIcon = styled.img`
  transition: 0.2s;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 3px solid white;
  &:hover {
    transition: 0.2s;
    scale: 1.1;
    box-shadow: 0px 0px 5px 5px red;
  }
`;

export function TasksTable({ task, setTask }) {
  const [popUp, setPopUp] = useState({
    show: false,
    id: ""
  });
  const navigate = useNavigate();

  return (
    <>
      {popUp.show && (
        <DeleteConfirmation
          id={popUp.id}
          setPopUp={setPopUp}
          task={task}
          setTask={setTask}
        />
      )}
      <Tasklist>
        <Row>
          <TaskHeader> Tasks </TaskHeader>
          <Schedule> Schedule </Schedule>
          <Options> Options </Options>
        </Row>
        {task.map((rowContent, index) => {
          return (
            <Row key={rowContent.id}>
              <ToDo>
                <TaskCell task={rowContent} />
              </ToDo>
              <Schedule> {rowContent.schedule} </Schedule>
              <Options>
                <EditIcon
                  src={editIcon}
                  onClick={() => navigate("/EditTask", { state: rowContent })}
                />
                <DeleteIcon
                  src={deleteIcon}
                  onClick={() =>
                    setPopUp({
                      show: true,
                      id: rowContent.id
                    })
                  }
                />
              </Options>
            </Row>
          );
        })}
      </Tasklist>
    </>
  );
}
