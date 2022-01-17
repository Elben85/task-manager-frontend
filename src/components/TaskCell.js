import { useState } from "react";
import CollaspedTask from "./CollaspedTask";
import { TaskCellState } from "./enum";
import ExpandedTask from "./ExpandedTask";

export default function TaskCell({ task }) {
  const [cellState, setCellState] = useState(TaskCellState.Collapsed);

  function handleCollapseClick() {
    setCellState(TaskCellState.Collapsed);
  }

  function handleExpandClick() {
    setCellState(TaskCellState.Expanded);
  }

  if (cellState === TaskCellState.Collapsed) {
    return (
      <CollaspedTask
        taskName={task.taskName}
        handleExpandClick={handleExpandClick}
      />
    );
  } else {
    return (
      <ExpandedTask
        taskName={task.taskName}
        description={task.description}
        handleCollapseClick={handleCollapseClick}
      />
    );
  }
}
