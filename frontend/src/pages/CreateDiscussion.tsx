import { useState } from "react";
import { useNavigate } from "react-router";

const CreateDiscussion = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const threadData = {
      title,
      category,
      description,
    };

    try {
      const response = await fetch("http://localhost:8000/forum/thread/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(threadData),
      });

      if (response.ok) {
        console.log("Thread created successfully");
        navigate("/");
      } else {
        console.error("Failed to create thread");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="fieldset w-md bg-base-200 border border-base-300 p-4 rounded-box">
        <label className="fieldset-label">Title</label>
        <input
          type="text"
          className="input w-full"
          placeholder="Enter your title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <label className="fieldset-label">Category</label>
        <input
          type="text"
          className="input w-full"
          placeholder="Enter the category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        
        <label className="fieldset-label">Description</label>
        <textarea
          className="textarea w-full"
          placeholder="Elaborate your discussion here.."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="submit" className="btn btn-neutral mt-4">Start Discussion</button>
      </form>
    </div>
  );
};

export default CreateDiscussion;