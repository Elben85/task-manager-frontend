import React from "react";
import styled from "styled-components";
import editIcon from "../image/edit.png";
import deleteIcon from "../image/delete.png";
import { useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";
import { useNavigate } from "react-router-dom";
import TaskCell from "./TaskCell";

const Tasklist = styled.table`
  display: flex;
  flex-direction: column;
  border: 2px solid white;
  border-collapse: collapse;
  width: 98vw;
  align-self: center;
`;
const Row = styled.tr`
  border: 2px solid white;
  display: flex;
`;
const No = styled.th`
  border: 2px solid white;
  padding: 10px;
  width: 50px;
  flex: 0 0 auto;
`;
const ToDo = styled.th`
  border: 2px solid white;
  padding: 10px;
  flex: 1 1 auto;
  overflow-wrap: break-word;
  -ms-word-break: break-word;
  word-wrap: break-word;
  word-break: break-word;
`;
const Schedule = styled.th`
  border: 2px solid white;
  padding: 10px;
  width: 200px;
  flex: 0 0 auto;
`;

const Options = styled.th`
  display: flex;
  border: 2px solid white;
  padding: 10px;
  width: 200px;
  flex: 0 0 auto;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
`;

const EditIcon = styled.img`
  transition: 0.2s;
  width: 50px;
  height: 50px;
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
  &:hover {
    transition: 0.2s;
    scale: 1.1;
    box-shadow: 0px 0px 5px 5px red;
  }
`;

export function TasksTable({ task, setTask }) {
  const [popUp, setPopUp] = useState({
    show: false,
    id: "",
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
          <No> No </No>
          <ToDo> Tasks </ToDo>
          <Schedule> Schedule </Schedule>
          <Options> Options </Options>
        </Row>

        {task.map((rowContent, index) => {
          return (
            <Row key={rowContent.id}>
              <No> {index + 1} </No>
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
                      id: rowContent.id,
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
