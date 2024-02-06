import React, { useState, useEffect } from "react";

const Todo = ({ text, todo, todos, setTodos }) => {
  // Existing Todo states and functions
  const [isEditingDueDate, setIsEditingDueDate] = useState(false);
  const [updatedDueDate, setUpdatedDueDate] = useState(todo.dueDate);

  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
  };

  const completeHandler = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  const editTodo = (id) => {
    const updatedTodo = todos.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          text: prompt("Enter new task", item.text) || item.text,
        };
      }
      return item;
    });
    setTodos(updatedTodo);
  };

  const toggleDueDateEditing = () => {
    setIsEditingDueDate(!isEditingDueDate);
  };

  const updateDueDate = () => {
    const updatedTodos = todos.map((item) =>
      item.id === todo.id ? { ...item, dueDate: updatedDueDate } : item
    );
    setTodos(updatedTodos);
    setIsEditingDueDate(false);
  };

  return (
    <div className="todo">
      <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
        {text}
        <div>
          {isEditingDueDate ? (
            <div className="due-date-edit">
              <label htmlFor="dueDate">Due Date:</label>
              <input
                type="date"
                id="dueDate"
                value={updatedDueDate}
                onChange={(e) => setUpdatedDueDate(e.target.value)}
              />
              <button className="due-date-update-btn" onClick={updateDueDate}>
                Update
              </button>
            </div>
          ) : (
            <div>
              {todo.dueDate && (
                <span className="due-date" onClick={toggleDueDateEditing}>
                  Due Date: {new Date(todo.dueDate).toDateString()}
                </span>
              )}
            </div>
          )}
        </div>
      </li>
      <button className="complete-btn" onClick={completeHandler}>
        <i className="fas fa-check"></i>
      </button>
      <button className="trash-btn" onClick={deleteHandler}>
        <i className="fas fa-trash"></i>
      </button>
      <button className="edit-btn" onClick={() => editTodo(todo.id)}>
        <i className="fas fa-edit"></i>
      </button>
    </div>
  );
};

export default Todo;
