import { Route, Routes, BrowserRouter } from "react-router-dom"
import Homepage from "./pages/Homepage"
import AddTask from "./pages/AddTask"
import TaskList from "./pages/TaskList"

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/AddTask" element={<AddTask />} />
          <Route path='/TaskList' element={<TaskList />} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
