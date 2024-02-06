import React, { useState } from "react";

const Form = ({ inputText, setInputText, todos, setTodos, setStatus }) => {
  const [dueDate, setDueDate] = useState("");
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitTodoHandler = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        text: inputText,

        completed: false,
        id: Math.random() * 1000,
        dueDate: dueDate,
      },
    ]);
    setInputText("");
    setDueDate("");
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  return (
    <form>
      <div className="form-control">
        <input
          type="text"
          className="todo-input"
          placeholder="Add a task"
          value={inputText}
          onChange={inputTextHandler}
        />
        <input
          type="datetime-local"
          className="due-date-input"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button
          className="todo-button"
          type="submit"
          onClick={submitTodoHandler}
        >
          <i className="fas fa-plus-square"></i>
        </button>
      </div>
      <div className="select">
        <select name="todos" className="filter-todo" onChange={statusHandler}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
};

export default Form;
