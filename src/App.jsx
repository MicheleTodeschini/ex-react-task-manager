import { Route, Routes, BrowserRouter } from "react-router-dom"
import Homepage from "./pages/Homepage"
import AddTask from "./pages/AddTask"
import TaskList from "./pages/TaskList"
import { GlobalProvider } from "./context/GlobalContext"

function App() {


  return (
    <>
      <GlobalProvider>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/AddTask" element={<AddTask />} />
            <Route path='/TaskList' element={<TaskList />} />
          </Routes>

        </BrowserRouter>
      </GlobalProvider>

    </>
  )
}

export default App
