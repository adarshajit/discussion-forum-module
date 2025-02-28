import Navbar from "../components/Navbar"
import Threads from "../components/Threads"
import Sidebar from "./Sidebar"

const Home = () => {
  return (
    <>
      <Navbar/>
      <div className="flex">
        <Sidebar/>
        <Threads/>
      </div>
    </>
  )
}

export default Home