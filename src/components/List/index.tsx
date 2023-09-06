import React from "react";
import ListBlock from "../ListBlock";

export type taskType = {
  title: string;
  complited: boolean;
};

const liButton = ["All", "Active", "Completed"];

const List: React.FC = () => {
  const [tasks, setTask] = React.useState<taskType[]>([]);
  const [currentFilter, setCurrentFilter] = React.useState<number>(0);
  const [inputValue, setInputValue] = React.useState<string>("");

  const createTask = () => {
    if (inputValue) {
      setTask([
        ...tasks,
        {
          title: inputValue,
          complited: false,
        },
      ]);
      setInputValue("");
    } else {
      alert("Enter the name in the input");
    }
  };

  const deleteCompletedTasks = () => {
    let newTasksArray = tasks;
    newTasksArray = newTasksArray.filter((el) => !el.complited);
    setTask([...newTasksArray]);
  };

  return (
    <div className="list">
      <h1>Todos</h1>
      <div className="list__main">
        <input
          placeholder="What needs to be done?(hit enter to post)"
          value={inputValue}
          onChange={(el) => setInputValue(el.target.value)}
          onKeyDown={(el) => el.key == "Enter" && createTask()}
        />
        <div className="list__main__task">
          {tasks.length === 0 ? (
            <h1>Empty</h1>
          ) : currentFilter === 0 ? (
            tasks.map((el, index) => (
              <ListBlock
                key={index}
                tasks={tasks}
                setTask={setTask}
                id={index}
                title={el.title}
                complited={el.complited}
              />
            ))
          ) : currentFilter === 1 ? (
            tasks.map(
              (el, index) =>
                !el.complited && (
                  <ListBlock
                    key={index}
                    tasks={tasks}
                    setTask={setTask}
                    id={index}
                    title={el.title}
                    complited={el.complited}
                  />
                )
            )
          ) : (
            tasks.map(
              (el, index) =>
                el.complited && (
                  <ListBlock
                    key={index}
                    tasks={tasks}
                    setTask={setTask}
                    id={index}
                    title={el.title}
                    complited={el.complited}
                  />
                )
            )
          )}
        </div>
        <div className="list__main__info">
          <>
            {tasks.length !== 0
              ? `${tasks
                  .filter((el) => !el.complited)
                  .reduce((currentValue) => (currentValue += 1), 0)} items left`
              : "todo-list is empty"}
          </>
          <ul>
            {liButton.map((el, index) => (
              <li
                key={index}
                className={index == currentFilter ? "active" : ""}
                onClick={() => setCurrentFilter(index)}
              >
                {el}
              </li>
            ))}
          </ul>
          <span onClick={deleteCompletedTasks}>Clear completed</span>
        </div>
      </div>
    </div>
  );
};

export default List;
