import SideNav from "./elements/SideNav";
import {Routes,Route,BrowserRouter} from "react-router-dom";
import About from "./pages/About";
import History from "./pages/History";
import Home from "./pages/Home";

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Home/>}></Route>
      <Route path="/about" exact element={<About/>}></Route>
      <Route path="/history" exact element={<History/>}></Route>
      {/* <Route path="/settings" exact element={<Settings/>}></Route> */}
    </Routes>
    </BrowserRouter>
    </>
  )

}
export default App;
