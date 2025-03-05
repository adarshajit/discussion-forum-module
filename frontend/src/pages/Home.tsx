import DiscussionList from "../components/Discussion/DiscussionList"
import Sidebar from "../layouts/Sidebar"

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