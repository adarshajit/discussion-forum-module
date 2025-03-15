import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { Thread } from '../types';
import { useEffect, useState } from 'react';
import DiscussionApi from '../api/discussion';
import Loader from '../components/Loader';

const Profile = () => {
    const [threads, setThreads] = useState<Thread[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuth();

  // const mockThreads: Thread[] = [
  //   {
  //     id: 1,
  //     title: "Introduction to React",
  //     description: "Learn the basics of React",
  //     category: "React",
  //     author: user,
  //     created_at: "2024-03-15",
  //     updated_at: "2024-03-15",
  //   },
  //   {
  //     id: 2,
  //     title: "Advanced TypeScript",
  //     description: "Deep dive into TypeScript",
  //     category: "TypeScript",
  //     author: user,
  //     created_at: "2024-03-15",
  //     updated_at: "2024-03-15",
  //   }
  // ];

  useEffect(() => {
      const fetchThreads = async () => {
        try {
            setLoading(true)
            const data = await DiscussionApi.getThreads();
            const userCreatedThreads = data.filter(thread=> thread.author.username === user?.username)
            setThreads(userCreatedThreads);
          }
        catch (error) {
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchThreads();
    }, [user]);

  if (loading) return <Loader message='Hang tight! Fetching your posts.'/>

  return (
    <div className="container mx-auto p-16">

      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user?.avatarUrl} alt={user?.username} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.username}</h2>
              <p className="text-md text-lg mt-2">{user?.bio}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">My Threads</h3>

        <div className="grid gap-4">

          {threads.length === 0 && <p className='text-2xl mt-10 font-bold text-gray-500'>You don't have any threads yet!</p>}


          {threads.map((thread) => (
            <div key={thread.id} className="card bg-base-100 shadow-md">
              <div className="card-body">
                <Link to={`/thread/${thread.id}`}>
                  <h4 className="card-title hover:text-primary">{thread.title}</h4>
                </Link>
                <p className="text-base-content/70">{thread.description}</p>
                <div className="card-actions justify-between items-center mt-4">
                  <div className="badge badge-outline">{thread.category}</div>
                  <div className="text-sm text-base-content/60">
                    {new Date(thread.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;