import { useEffect, useState } from "react";

export async function getServerSideProps() {
  const tasks = [
    { id: 1, title: "Shop for festival", description: "Dress, shoes, makeup", priority: "high", completed: false },
    { id: 2, title: "Wash and clean house", description: "Vacuum and dust", priority: "medium", completed: true },
    { id: 3, title: "Complete pending office work", description: "Take feedback and submit report", priority: "low", completed: false },
  ];

  return {
    props: {
      tasks,
    },
  };
}

export default function Home({ tasks }) {
  const [taskList, setTaskList] = useState(tasks);
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "low" });
  const [searchQuery, setSearchQuery] = useState("");

  // Load tasks from local storage on mount (bonus task also done according to requirements)
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTaskList(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to local storage whenever taskList changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  // Handle Add Task
  const addTask = () => {
    if (newTask.title.trim() === "" || newTask.description.trim() === "") return;
    const id = taskList.length > 0 ? taskList[taskList.length - 1].id + 1 : 1; // Increment id properly
    const updatedTask = { ...newTask, id, completed: false };
    setTaskList((prev) => [...prev, updatedTask]);
    setNewTask({ title: "", description: "", priority: "low" });
  };

  // Handle Toggle Completion
  const toggleCompletion = (id) => {
    setTaskList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handle Delete Task
  const deleteTask = (id) => {
    setTaskList((prev) => prev.filter((task) => task.id !== id));
  };

  // Sort tasks by priority (high -> low) and completed status (completed tasks at the bottom)
  const sortedTasks = taskList
    .slice()
    .sort((a, b) => {
      const priorities = { high: 3, medium: 2, low: 1 };

      // Sort by completed status (completed tasks at the bottom)
      if (a.completed !== b.completed) {
        return a.completed - b.completed; // completed tasks (true = 1) come last
      }

      // If both tasks are either completed or pending, sort by priority
      return priorities[b.priority] - priorities[a.priority];
    });

  // Filter tasks based on search query ( bonus task also done according to requirements)
  const filteredTasks = sortedTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Task List</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Add Task Form */}
      <div className="task-form">
        <h2>Add a New Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <label>Priority:</label>
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Display Tasks */}
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className={`task-item ${task.priority} ${task.completed ? 'completed' : ''}`}>
            <h3>{task.title} <span className="priority-tag">({task.priority})</span></h3>
            <p>{task.description}</p>
            <div className="task-actions">
              <button onClick={() => toggleCompletion(task.id)}>
                {task.completed ? "Mark as Pending" : "Mark as Completed"}
              </button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .container {
          padding: 20px;
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          background-color: white;
        }
        h1 {
          text-align: center;
          margin-bottom: 20px;
          color: black;
        }
        .search-bar {
          margin-bottom: 20px;
        }
        input[type="text"] {
          padding: 10px;
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 5px;
          color: black;
        }
        .task-form {
          margin-bottom: 20px;
          color: black;
        }
        input, textarea, select {
          display: block;
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        button {
          padding: 10px 15px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #005bb5;
        }
        .task-list {
          list-style: none;
          padding: 0;
        }
        .task-item {
          background-color: #f9f9f9;
          margin: 10px 0;
          padding: 15px;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
          position: relative;
          color: black;
        }
        .task-item h3 {
          margin: 0;
          display: inline-block;
        }
        .task-item p {
          margin: 5px 0 15px 0;
        }
        .priority-tag {
          color: black;
        }
        .task-actions {
          display: flex;
          gap: 10px;
        }
        .high {
          border-left: 5px solid red;
        }
        .medium {
          border-left: 5px solid yellow;
        }
        .low {
          border-left: 5px solid green;
        }
        .completed h3 {
          text-decoration: line-through;
        }
        @media (max-width: 600px) {
          .task-item {
            padding: 10px;
          }
          button {
            padding: 8px 12px;
          }
        }
      `}</style>
    </div>
  );
}

