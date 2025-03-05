import { useEffect, useState } from "react";
import DiscussionItem from "./DiscussionItem";

const DiscussionList = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await fetch("https://discussion-forum-module.onrender.com/forum/threads/");
        if (response.ok) {
          const data = await response.json();
          setThreads(data);
        } else {
          console.error("Failed to fetch threads");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchThreads();
  }, []);

  return (
    <div className="p-10">
      <ul className="list bg-base-100 rounded-box shadow-md">
        {threads.map((thread) => (
          <div className="w-full">
            <DiscussionItem key={thread.id} thread={thread} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DiscussionList;