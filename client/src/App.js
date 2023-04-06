import "./App.scss";
import Nav from "./views/Youtube/Nav/Nav"
import Body from "./views/Youtube/Body/Body-Youtube"
import {  useRef,useState } from "react";
import Popular from "./views/Youtube/Popular/Popular"
import Home from "./views/Home/Home"
import Sidebar from "./views/Spotify/Sidebar"
import Homesp from "./views/Spotify/Homespotify"
import Search from "./views/Spotify/Search"
import Bottom from "./views/Spotify/Bottom"
import Navtiktok from "./views/Tiktok/Nav-Tiktok"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
function App(props) {
  const [isshow,setisshow] = useState(true)
  const [query,setquery] = useState('')
  //mở khóa chức năng login
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const childRef = useRef();
  let handlesearch= (query)=> {
    setquery(query)
    setTimeout(() => {
      childRef.current.search()
    }, query);
  }
  
  return <div className="App">
  
  <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/tiktok" element={<><Navtiktok/></>}></Route>
    <Route path="/spotify" element={<><Sidebar/><Homesp/><Bottom/></>}></Route>
    <Route path="/spotify/search" element={<><Sidebar/><Search/><Bottom/></>}></Route>
    <Route path="/youtube" element={<>
    <Nav handlesearch={handlesearch}
    setisshow={setisshow}
    setIsLoggedIn={setIsLoggedIn}
    isLoggedIn={isLoggedIn}
    />
    <Popular isshow={isshow} isLoggedIn={isLoggedIn}/>
    <Body 
    ref={childRef}
    query1={query}
    isshow={isshow}
    isLoggedIn={isLoggedIn}
  />
    </>}></Route>
  </Routes>
 

  </div>;
}

export default App;
