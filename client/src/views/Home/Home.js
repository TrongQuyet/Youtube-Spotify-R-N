import React from 'react';
import "./Home.scss"
import logoyt from './youtube.png';
import logosf from './spotify.png';
import logott from './tiktok.png';
import { Link, NavLink } from "react-router-dom";
const Home = (props) => {
    return (
        <div className="home">
            <h1>Bạn Muốn?</h1>
            <div className="icon">
            <NavLink to="/youtube"><img className='logo' src={logoyt}/></NavLink>
            <NavLink to="/spotify"><img className='logo' src={logosf}/>  </NavLink>
            <NavLink to="/tiktok"><img className='logo' src={logott}/>  </NavLink>
              
            </div>
            
        </div>
    );
};

export default Home;