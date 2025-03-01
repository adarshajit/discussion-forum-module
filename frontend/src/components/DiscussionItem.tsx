import { Link } from "react-router"

const DiscussionItem = ({thread}) => {
  return (
    <> 
    <li className="flex flex-col p-3 w-full max-w-xl min-w-xl min-h-20">
      <div className="flex py-4">
        <img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/>
        <div className="flex flex-col px-3">
          <div>{thread.author.username}</div>
          <div className="text-xs uppercase font-semibold opacity-60">{thread.author.role}</div>
        </div>
      </div>
      <p className="list-col-wrap text-xs">
        {thread.description}
      </p>
      <div className="flex justify-end gap-3">
      <Link className="btn btn-ghost" to={`/thread/${thread.id}`}>Read more</Link>

      <button className="btn btn-square btn-ghost">
        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
      </button>
      </div>
    </li>
  </>
  )
}

export default DiscussionItem