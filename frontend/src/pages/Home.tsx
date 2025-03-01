import Threads from "../components/DiscussionList"
import Sidebar from "./Sidebar"

const Home = () => {
  return (
    <>
      <div className="flex">
        <Sidebar/>
        <Threads/>
      </div>
    </>
  )
}

export default Home