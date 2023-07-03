import React, { useState, useEffect } from "react";
import "./index.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(
          data.map((todo) => ({
            title: todo.title,
            completed: todo.completed,
          }))
        );
      })
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const handleInputChange = (e) => {
    setCurrentTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (currentTodo.trim() !== "") {
      if (editingIndex === -1) {
        setTodos([...todos, { title: currentTodo, completed: false }]);
      } else {
        const updatedTodos = [...todos];
        updatedTodos[editingIndex].title = currentTodo;
        setTodos(updatedTodos);
        setEditingIndex(-1);
      }
      setCurrentTodo("");
    } else {
      alert("Todo is empty!");
    }
  };

  const handleEditTodo = (index) => {
    setCurrentTodo(todos[index].title);
    setEditingIndex(index);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.completed;
    } else if (filter === "pending") {
      return !todo.completed;
    }
    return true;
  });

  return (
    <div className="Container">
      <div>
        <input
          className="todo-input"
          type="text"
          value={currentTodo}
          onChange={handleInputChange}
          placeholder="Enter a todo..."
        />
        <button onClick={handleAddTodo}> {editingIndex === -1 ? "Add" : "Update"}</button>
      </div>
      <div className="filter">
        <span>Show: </span>
        <button onClick={() => handleFilterChange("all")}>All</button>
        <button onClick={() => handleFilterChange("completed")}>Completed</button>
        <button onClick={() => handleFilterChange("pending")}>Pending</button>
      </div>
      <ul className="AllTodo">
        {filteredTodos.map((todo, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "red" : "inherit",
            }}
          >
            <span
              style={{
                marginRight: "8px",
                cursor: "pointer",
              }}
              onClick={() => handleToggleComplete(index)}
            >
              {todo.title}
            </span>
            <button onClick={() => handleEditTodo(index)} style={{ marginRight: "8px" }}>
              Edit
            </button>
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
