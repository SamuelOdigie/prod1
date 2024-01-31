import React, { useState } from "react";

export default function Home() {
  const [statusId, setStatusId] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const handleInputChange = (e) => {
    setStatusId(e.target.value);
    setError("");
  };
  const fetchTasks = async (statusId) => {
    try {
      const response = await fetch(`/api/tasks?statusId=${statusId}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = parseInt(statusId);
    if (!Number.isInteger(id)) {
      alert("Please enter a number");
    } else {
      setError("");
    }
    const responseData = await fetchTasks(id);
    if (responseData) {
      setData(responseData);
      setError("");
    } else {
      setError("failed to fetch tasks");
    }
    console.log(responseData);
  };
  return (
    <div>
      <nav className="bg-gray-700 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <a href="#" className="font-bold">
            Home
          </a>
          <div>
            <a href="#" className="ml-4">
              About
            </a>
            <a href="#" className="ml-4">
              Contact
            </a>
            <a href="#" className="ml-4">
              Github
            </a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto my-10">
        <div className="flex flex-col items-center">
          <form className="w-full max-w-sm" onSubmit={handleSubmit}>
            <div className="flex items-center border-b border-gray-700 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                value={statusId}
                onChange={handleInputChange}
                type="text"
                placeholder="Product Status ID"
                aria-label="Product Status ID"
              />
              <button
                className="flex-shrink-0 bg-gray-700 hover:bg-gray-500 border-gray-700 hover:border-gray-500 text-sm border-4 text-white py-1 px-2 rounded"
                type="submit"
              >
                Submit
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </form>
          <div className="fixed bottom-0 right-0 m-4">
            <img src="/images.png" alt="Your Image" className="my-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
