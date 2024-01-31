import React, { useState } from "react";

export default function Home() {
  const [statusId, setStatusId] = useState("");
  const [taskId, setTaskId] = useState("");
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskDetails, setTaskDetails] = useState(null);

  const handleStatusInputChange = (e) => {
    setStatusId(e.target.value);
    setError("");
  };
  const handleTaskInputChange = (e) => {
    setTaskId(e.target.value);
    setError("");
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(`/api/tasks?statusId=${statusId}`);
      if (!response.ok) {
        throw new Error("please enter a valid status id");
      }
      const data = await response.json();
      console.log(data);
      setTasks(data.task_ids || []);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.toString());
    }
  };

  const fetchTaskDetails = async () => {
    try {
      const response = await fetch(`/api/taskDetails?taskId=${taskId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch task details");
      }
      const details = await response.json();
      setTaskDetails(details);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.toString());
    }
    console.log(taskDetails);
  };

  const handleTasksSubmit = async (e) => {
    e.preventDefault();
    await fetchTasks();
  };

  const handleTaskDetailsSubmit = async (e) => {
    e.preventDefault();
    await fetchTaskDetails();
  };

  return (
    <div>
      <nav className="bg-gray-700 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <a href="#" className="font-bold">
            Home
          </a>
          <div>
            <a href="https://www.swiftcase.co.uk/about-us/" className="ml-4">
              About
            </a>
            <a
              href="https://www.linkedin.com/in/samuel-odigie-646616230/"
              className="ml-4"
            >
              Contact
            </a>
            <a
              href="https://github.com/SamuelOdigie/swiftcase"
              className="ml-4"
            >
              Github
            </a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto my-10">
        <div className="flex flex-col items-center">
          <form className="w-full max-w-sm" onSubmit={handleTasksSubmit}>
            <div className="flex items-center border-b border-gray-700 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                value={statusId}
                onChange={handleStatusInputChange}
                type="text"
                placeholder="Product Status ID"
                aria-label="Product Status ID"
              />
              <button
                className="flex-shrink-0 bg-gray-700 hover:bg-gray-500 border-gray-700 hover:border-gray-500 text-sm border-4 text-white py-1 px-2 rounded"
                type="submit"
              >
                Fetch Tasks
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </form>

          <div>
            <h2>Tasks</h2>
            <ul>
              {tasks.map((task, index) => (
                <li key={index}>
                  <p>Task ID: {task.id}</p>
                </li>
              ))}
            </ul>
          </div>

          <form className="w-full max-w-sm" onSubmit={handleTaskDetailsSubmit}>
            <div className="flex items-center border-b border-gray-700 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                value={taskId}
                onChange={handleTaskInputChange}
                type="text"
                placeholder="Task ID"
                aria-label="Task ID"
              />
              <button
                className="flex-shrink-0 bg-gray-700 hover:bg-gray-500 border-gray-700 hover:border-gray-500 text-sm border-4 text-white py-1 px-2 rounded"
                type="submit"
              >
                Get Task Details
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </form>

          {taskDetails && (
            <div>
              <h2>Task Details</h2>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 right-0 m-4">
        <img src="/images.png" alt="Your Image" className="my-4" />
      </div>
    </div>
  );
}
