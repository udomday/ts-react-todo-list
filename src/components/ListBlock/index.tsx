import React from "react";

import cross from "../../assets/cross.svg";
import { taskType } from "../List";

interface TaskTypeProps extends taskType {
  id: number;
  tasks: taskType[];
  setTask: React.Dispatch<React.SetStateAction<taskType[]>>;
}

const ListBlock: React.FC<TaskTypeProps> = ({
  id,
  title,
  complited,
  tasks,
  setTask,
}) => {
  const setChecked = () => {
    let newTasksArray = tasks;
    newTasksArray[id].complited = !newTasksArray[id].complited;
    setTask([...newTasksArray]);
  };

  const deleteTask = () => {
    let newTasksArray = tasks;
    newTasksArray = newTasksArray.filter((el, index) => index !== id);
    setTask([...newTasksArray]);
  };
  return (
    <div className="task__root">
      <input onChange={setChecked} checked={complited} type="checkbox" />
      <div
        className={
          complited
            ? "task__root__title task__root__title__done"
            : "task__root__title"
        }
      >
        {title}
      </div>
      <div className="task__root__img">
        <img onClick={deleteTask} src={cross} />
      </div>
    </div>
  );
};

export default ListBlock;
