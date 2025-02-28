import Threads from "../components/Threads"
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