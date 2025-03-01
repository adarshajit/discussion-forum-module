import DiscussionList from "../components/DiscussionList"
import Sidebar from "./Sidebar"

const Home = () => {
  return (
    <>
      <div className="flex">
        <Sidebar/>
        <DiscussionList/>
      </div>
    </>
  )
}

export default Home